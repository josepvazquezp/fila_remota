const {Schema, model} = require('mongoose');

const orderSchema = new Schema({
    customerId: {type: String},
    restaurantId: {type: String},
    total: {type: Number},
    status: {type: String},
    products: {type: [{
        product: {
            type: Schema.ObjectId,
            ref: "products"
        },
        quantity: {type: Number}
    }]},
    quantity: {type: Number}
});

module.exports = model('orders', orderSchema);