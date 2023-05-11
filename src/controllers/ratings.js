const Rating = require('./../models/rating');

const RatingController = {
    create: (req, res) => {
        let newRating = {
            ID_Evaluator: req.body.ID_Evaluator,
            ID_Evaluated: req.body.ID_Evaluated,
            Rating: req.body.Rating,
            Description: req.body.Description
        };

        console.log(newRating);

        Rating(newRating).save()
                        .then(rating => {
                            res.status(201).send(rating);
                        })
                        .catch(error => {
                            res.status(400).send('No se pudo asignar la calificación');
                        });
    },

    update: (req, res) => {
        const id = req.params.id;
        
        if(req.body != null && req.body.ID_Evaluator == undefined && req.body.ID_Evaluated == undefined) {
                Rating.findByIdAndUpdate(id, req.body, {new:true})
                                .then(rating => {
                                    res.status(200).send(rating);
                                })
                                .catch(error => {
                                    res.status(400).send('No se pudieron actualizar los datos de la calificación');
                                });
            }
        else {
            res.status(400).send('No se pudieron actualizar los datos de la calificación');
        }
    },
    
    list: (req, res) => {
        Rating.find({})
                .then(rating => {
                    res.status(200).send(rating);
                })
                .catch(error => {
                    res.status(400).send('No se encontraron reseñas');
                });
    },
    
    search: (req, res) => {
        const id = req.params.id;
        Rating.findById(id)
                .then(rating => {
                    res.status(200).send(rating);
                })
                .catch(error => {
                    res.status(400).send('No se encontro la reseña con ID: ' + id);
                });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Rating.findByIdAndDelete(id)
                                .then(rating => {
                                    res.status(200).send(rating);
                                })
                                .catch(error => {
                                    res.status(400).send('No se encontro la reseña con ID:' + id);
                                });
    }
}

module.exports = RatingController;