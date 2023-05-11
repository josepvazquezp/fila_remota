const {Schema, model} = require('mongoose');

const cardSchema = new Schema({
    ID_User : {type: String},
    Type: {type: String},
    Date: {type: String},
    Number: {type: String}
});

module.exports = model('masterCards', cardSchema);
