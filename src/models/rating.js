const {Schema, model} = require('mongoose');

const ratingSchema = new Schema({
    ID_Evaluator: {type: String},
    ID_Evaluated: {type: String},
    Rating: {type: Number},
    Description: {type: String}
});

module.exports = model('ratings', ratingSchema);