const Card = require('./../models/mastercard');

const CardController = {
    create: (req, res) => {
        let newCard = {
            ID_User : req.body.ID_User,
            Type: req.body.Type,
            Date: req.body.Date,
            Number: req.body.Number
        };

        console.log(newCard);

        Card(newCard).save()
                        .then(card => {
                            res.status(201).send(card);
                        })
                        .catch(error => {
                            res.status(400).send('La tarjeta no fue dada el alta');
                        });
    },

    update: (req, res) => {
        const id = req.params.id;
        
        if(req.body != null && req.body.ID_User == undefined) {
                Card.findByIdAndUpdate(id, req.body, {new:true})
                                .then(card => {
                                    res.status(200).send(card);
                                })
                                .catch(error => {
                                    res.status(400).send('No se pudieron actualizar los datos de la tarjeta');
                                });
            }
        else {
            res.status(400).send('No se pudieron actualizar los datos de la tarjeta');
        }
    },
    
    list: (req, res) => {
        Card.find({})
                .then(cards => {
                    res.status(200).send(cards);
                })
                .catch(error => {
                    res.status(400).send('No se encontraron tarjetas');
                });
    },
    
    search: (req, res) => {
        const id = req.params.id;
        Card.findById(id)
                .then(card => {
                    res.status(200).send(card);
                })
                .catch(error => {
                    res.status(400).send('No se encontro la tarjeta con ID: ' + id);
                });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Card.findByIdAndDelete(id)
                                .then(card => {
                                    res.status(200).send(card);
                                })
                                .catch(error => {
                                    res.status(400).send('No se encontro la tarjeta con ID:' + id);
                                });
    },
    searchCreate: (req, res) => { 
        const Qnumber = req.params.number;
        console.log("Tarjeta numero: " + Qnumber)


        Card.find({Number: Qnumber})
                .then(card => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).send(card);
                })
                .catch(error => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(400).send('No se encontro la tarjeta');
                });
    },
    listUserCards: (req, res) => {
        const Quser = req.params.user;
        console.log("Tarjeta del usuario; " + Quser);

        Card.find({ID_User: Quser})
                .then(cards => {
                    res.status(200).send(cards);
                })
                .catch(error => {
                    res.status(400).send('No se encontraron tarjetas');
                });
    }
    
}

module.exports = CardController;