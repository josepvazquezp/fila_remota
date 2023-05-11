const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {type: String},
    password: {type: String},
    name: {type: String},
    type: {type: String},
    history:{type: [{
        type: Schema.ObjectId,
        ref: "orders"
    }]},
    status: {type: String},
    image: {type: String},
    restaurant: {type: String}
});

module.exports = model('users', userSchema);