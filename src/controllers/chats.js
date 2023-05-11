const Chat = require('./../models/chat');

const ChatsController = {
    create: (req, res) => {
        let newChat = {
            customerId: req.body.customerId,
            restaurantId: req.body.restaurantId,
            messages: []
        };

        Chat(newChat).save()
                        .then(chat => {
                            res.status(201).send(chat);
                        })
                        .catch(error => {
                            res.status(400).send('No se pudo crear el chat');
                        });
    },

    update: (req, res) => {
        const id = req.params.id;

        
        let ts = Date.now()
        let date = new Date(ts);
        let stringDate = date.getHours()  + ":" + date.getMinutes() + " " + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()


        const newMessage = {
            sender: req.body.sender,
            message: req.body.message,
            date: stringDate
        }
        Chat.findByIdAndUpdate(id, {$push: {messages: newMessage}},  { new: true })
                        .then(chat => {
                            res.status(200).send(chat);
                        })
                        .catch(error => {
                            res.status(400).send('No se pudo actualizar el chat');
                        });

    },
    
    list: (req, res) => {
        Chat.find({})
                .then(chat => {
                    res.status(200).send(chat);
                })
                .catch(error => {
                    res.status(400).send('Algo salio mal');
                });
    },
    
    search: (req, res) => {
        const id = req.params.id;
        Chat.findById(id)
                .then(chat => {
                    res.status(200).send(chat);
                })
                .catch(error => {
                    res.status(400).send('No se encontro el chat: ' + id);
                });
    },

    delete: (req, res) => {
        const id = req.params.id;
        Chat.findByIdAndDelete(id)
                                .then(chat => {
                                    res.status(200).send(chat);
                                })
                                .catch(error => {
                                    res.status(400).send('No se encontro el chat: ' + id);
                                });
    },findAllMine: (req, res) => {
        const MyID = req.body.MyID
        const type  = (req.body.type == "Cliente") ? "customerId" : "restaurantId";
        let body = JSON.parse('{"' + type + '": "' + MyID + '"}');

        Chat.find(body)
                .then(chat => {
                    res.status(200).send(chat);
                })
                .catch(error => {
                    res.status(400).send('No se encontro el chat: ');
                });
    },
    findChat: (req, res) => {
        const MyID = req.body.MyID
        const ItID = req.body.ItID;
        let body = "";
        
        body = JSON.parse('{"customerId": "' + MyID + '", "restaurantId": "' + ItID +'"}')


        Chat.find(body)
                .then(chat => {

                    res.status(200).send(chat);
                })
                .catch(error => {
                    res.status(400).send('No se encontro el chat: ');
                });
    }
}

module.exports = ChatsController;