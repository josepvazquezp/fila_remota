const Order = require('./../models/order');
const User = require('./../models/user');

const OrdersController = {
    create: (req, res) => {
        let newOrder = {
            customerId: req.body.customerId,
            restaurantId: req.body.restaurantId,
            total: req.body.total,
            status: "creada",
            products: [{product: req.body.product, quantity: req.body.quantity}],
            quantity: req.body.quantity
        };

        Order(newOrder).save()
                        .then(order => {
                            User.findById(req.body.customerId)
                                .then(user => {
                                let orders = user.history;
                                orders.push(order.id);

                                let body = JSON.parse(JSON.stringify({history: orders}));
                                
                                User.findByIdAndUpdate(req.body.customerId, body, {new:true})
                                    .then(user => {
                                        res.status(201).send({order, user});
                                    })
                                    .catch(error => {
                                        res.status(400).send('No se pudo actualizar el usuario');
                                    });
                                })
                                .catch(error => {
                                    res.status(400).send('No se encontro el usuario con ID: ' + req.body.customerId);
                                });
                        })
                        .catch(error => {
                            res.status(400).send('No se pudo crear la orden');
                        });
    },

    update: (req, res) => {
        const id = req.params.id;

        Order.findByIdAndUpdate(id, req.body, {new:true})
                        .then(order => {
                            res.status(200).send(order);
                        })
                        .catch(error => {
                            res.status(400).send('No se pudo actualizar la orden');
                        });
    },
    
    list: (req, res) => {
        Order.find({})
                .then(orders => {
                    res.status(200).send(orders);
                })
                .catch(error => {
                    res.status(400).send('Algo salio mal');
                });
    },
    
    search: (req, res) => {
        const id = req.params.id;
        Order.findById(id).populate('products.product')
                .then(order => {
                    res.status(200).send(order);
                })
                .catch(error => {
                    res.status(400).send('No se encontro la orden: ' + id);
                });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Order.findByIdAndDelete(id)
                                .then(order => {
                                    User.findById(order.customerId)
                                        .then(user => {
                                        let orders = user.history;
                                        let index = orders.findIndex(item => item == order.id);

                                        orders.splice(index, 1);

                                        let body = JSON.parse(JSON.stringify({history: orders}));

                                        User.findByIdAndUpdate(order.customerId, body, {new:true})
                                            .then(user => {
                                                res.status(201).send({order, user});
                                            })
                                            .catch(error => {
                                                res.status(400).send('No se pudo actualizar el usuario');
                                            });
                                        })
                                        .catch(error => {
                                            res.status(400).send('No se encontro al usuario con ID: ' + order.customerId);
                                        });
                                })
                                .catch(error => {
                                    res.status(400).send('No se encontro la orden: ' + id);
                                });
    }
}

module.exports = OrdersController;