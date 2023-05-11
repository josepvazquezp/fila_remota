const Restaurant = require('./../models/restaurant');

const RestaurantsController = {
    create: (req, res) => {
        let newRestaurant = {
            name: req.body.name,
            products: [],
            description: req.body.description,
            type: req.body.type,
            location: req.body.location,
            image: "default icon",
            orders: []
        };

        Restaurant(newRestaurant).save()
                        .then(restaurant => {
                            res.status(201).send(restaurant);
                        })
                        .catch(error => {
                            res.status(400).send('No se pudo crear el restaurant');
                        });
    },

    update: (req, res) => {
        const id = req.params.id;
        
        Restaurant.findByIdAndUpdate(id, req.body, {new:true})
                        .then(restaurant => {
                            res.status(200).send(restaurant);
                        })
                        .catch(error => {
                            res.status(400).send('No se pudo actualizar el restaurant');
                        });
    },
    
    list: (req, res) => {
        Restaurant.find({})
                .then(restaurants => {
                    res.status(200).send(restaurants);
                })
                .catch(error => {
                    res.status(400).send('Algo salio mal');
                });
    },
    
    search: (req, res) => {
        const id = req.params.id;
        Restaurant.findById(id).populate('products').populate('orders')
                .then(restaurants => {
                    res.status(200).send(restaurants);
                })
                .catch(error => {
                    res.status(400).send('No se encontro el restaurant: ' + id);
                });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Restaurant.findByIdAndDelete(id)
                                .then(restaurant => {
                                    res.status(200).send(restaurant);
                                })
                                .catch(error => {
                                    res.status(400).send('No se encontro el restaurant: ' + id);
                                });
    },
    category: (req, res) => {
        const type = req.body.type;

        Restaurant.find({type: type})
                .then(restaurants => {
                    res.status(200).send(restaurants);
                })
                .catch(error => {
                    res.status(400).send('No se encontro el restaurant con type: ' + type);
                });

    },
    search_in: (req, res) => {
        const filter = req.params.filter;

        Restaurant.find({name: {
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

module.exports = RestaurantsController;