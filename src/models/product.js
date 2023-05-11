const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    Name: {type: String},
    Description: {type: String},
    Price: {type: Number},
    Available: {type: Boolean},
    Image: {type: String},
    RestaurantId: {
        type: Schema.ObjectId,
        ref: "restaurants"
    },
});

module.exports = model('products', productSchema);