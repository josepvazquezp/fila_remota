const Product = require('./../models/product');
const Restaurant = require('./../models/restaurant');

const ProductsController = {
    create: (req, res) => {
        let newProduct = {
            Name : req.body.Name,
            Description: req.body.Description,
            Price: req.body.Price,
            Available: true,
            Image: "default",
            RestaurantId: req.body.RestaurantId
        };

        console.log(newProduct);

        Product(newProduct).save()
                        .then(product => {
                            Restaurant.findById(req.body.RestaurantId)
                                .then(restaurant => {
                                    let products = restaurant.products;
                                    products.push(product.id);

                                    let body = JSON.parse(JSON.stringify({products: products}));
                            
                                    Restaurant.findByIdAndUpdate(req.body.RestaurantId, body, {new:true})
                                        .then(restaurant => {
                                            res.status(201).send({product, restaurant});
                                        })
                                        .catch(error => {
                                            res.status(400).send('No se pudo actualizar el restaurant');
                                        });
                                })
                                .catch(error => {
                                    res.status(400).send('No se encontro al restaurante con ID: ' + req.body.RestaurantId);
                                });

                        })
                        .catch(error => {
                            res.status(400).send('El producto no pudo ser registrado');
                        });
    },

    update: (req, res) => {
        const id = req.params.id;
        
        if(req.body != null) {
                Product.findByIdAndUpdate(id, req.body, {new:true})
                                .then(product => {
                                    res.status(200).send(product);
                                })
                                .catch(error => {
                                    res.status(400).send('No se pudo actualizar el producto');
                                });
            }
        else {
            res.status(400).send('No se pudo actualizar el producto');
        }
    },
    
    list: (req, res) => {
        Product.find({})
                .then(product => {
                    res.status(200).send(product);
                })
                .catch(error => {
                    res.status(400).send('No se encontraron los productos');
                });
    },
    
    search: (req, res) => {
        const id = req.params.id;
        Product.findById(id).populate('RestaurantId')
                .then(product => {
                    res.status(200).send(product);
                })
                .catch(error => {
                    res.status(400).send('No se encontro al producto con ID: ' + id);
                });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Product.findByIdAndDelete(id)
                                .then(product => {
                                    Restaurant.findById(product.RestaurantId)
                                    .then(restaurant => {
                                        let products = restaurant.products;
                                        let index = products.findIndex(item => item == product.id);

                                        products.splice(index, 1);

                                        let body = JSON.parse(JSON.stringify({products: products}));

                                        Restaurant.findByIdAndUpdate(product.RestaurantId, body, {new:true})
                                            .then(restaurant => {
                                                res.status(201).send({product, restaurant});
                                            })
                                            .catch(error => {
                                                res.status(400).send('No se pudo actualizar el restaurant');
                                            });
                                    })
                                    .catch(error => {
                                        res.status(400).send('No se encontro al restaurante con ID: ' + product.RestaurantId);
                                    });
                                })
                                .catch(error => {
                                    res.status(400).send('No se encontro al producto con ID:' + id);
                                });
    },
    search_in: (req, res) => {
        const filter = req.params.filter;

        Product.find({Name: {
            $regex: filter, 
            $options: 'i'
        }})
                .then(restaurants => {
                    res.status(200).send(restaurants);
                })
                .catch(error => {
                    res.status(400).send('No se encontro ningun restaurant con: ' + filter);
                });
    }
}

module.exports = ProductsController;