const {Schema, model} = require('mongoose');

const chatSchema = new Schema({
    customerId: {type: String},
    restaurantId: {type: String},
    messages: {type: [
        {
            sender: String,
            message: String,
            date: String
        }
    ]},
});

module.exports = model('chats', chatSchema)