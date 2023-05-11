const {Schema, model} = require('mongoose');

const restaurantSchema = new Schema({
    name: {type: String},
    email: {type: String},
    products: {type: [{
        type: Schema.ObjectId,
        ref: "products"
    }]},
    description: {type: String},
    type: {type: String},
    location: {type: String},
    image: {type: String},
    orders: {type: [{
        type: Schema.ObjectId,
        ref: "orders"
    }]},
});

module.exports = model('restaurants', restaurantSchema);