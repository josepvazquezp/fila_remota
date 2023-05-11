const express = require('express');
const mongoose = require('mongoose'); 
const routes = require('./routes');
const extraRoutes = require('./src/routes/index');
const swaggerJsDoc= require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerConf = require('./swagger.config');

const socketio = require("socket.io");

require('dotenv').config();

const app = express();

const mongoUrl = process.env.MONGO_URL;

console.log(mongoUrl);

const port = process.env.PORT || 3000;

const swaggerDocs = swaggerJsDoc(swaggerConf);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Reemplaza "http://localhost:4200" con la URL de tu aplicación Angular
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS'); // Configura los métodos HTTP permitidos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Configura los encabezados permitidos
    next();
  });
  
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use('/', extraRoutes);
routes(app);

mongoose.connect(mongoUrl).then(() =>{
    console.log('Se conecto correctamente a la base de datos');
    const server = app.listen(port, function() {
        console.log('app is running in port ' + port);
    });   

    const io = socketio(server, {
        cors: {
            origins: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    io.on("connection", socket => {
        socket.on("sendMessage", (data) => {
            socket.broadcast.emit("newMessage", {message: data});
        });

        socket.on("changeStatus", (data) => {
            socket.broadcast.emit("receiveStatus", {status: data})
        })

    });

}).catch(err => {
    console.log('No se pudo conectar a la base de datos', err);
});