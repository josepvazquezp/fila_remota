const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const User = require('./../models/user');

require('dotenv').config();

const googleClient = new OAuth2Client(process.env.GOOGLE_ID);

const key = process.env.KEY;

const UsersController = {
    create: (req, res) => {
        let newUser = {
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            type: req.body.type,
            history: [],
            status: "ok",
            image: "default icon"
        };

        console.log(newUser);

        User(newUser).save()
                        .then(user => {
                            

                            res.status(201).send(user);
                        })
                        .catch(error => {
                            res.setHeader('Access-Control-Allow-Origin', '*');
                            res.status(400).send('No se pudo crear el usuario');
                        });
    },

    update: (req, res) => {
        const id = req.params.id;
        
        if(req.body.email == undefined && req.body.type == undefined && 
           (req.body.password != undefined || req.body.name != undefined || 
            req.body.history != undefined || req.body.status != undefined || 
            req.body.image != undefined || req.body.restaurant != undefined)) {

                User.findByIdAndUpdate(id, req.body, {new:true})
                                .then(user => {
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.status(200).send(user);
                                })
                                .catch(error => {
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.status(400).send('No se pudo actualizar el usuario');
                                });
            }
        else {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.status(400).send('No se pudo actualizar el usuario');
        }
    },
    
    list: (req, res) => {
        User.find({})
                .then(users => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).send(users);
                })
                .catch(error => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(400).send('Algo salio mal');
                });
    },
    
    search: (req, res) => {
        const id = req.params.id;
        User.findById(id).populate('history')
                .then(user => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).send(user);
                })
                .catch(error => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(400).send('No se encontro el usuario: ' + id);
                });
    },

    delete: (req, res) => {
        const id = req.params.id;
        User.findByIdAndDelete(id)
                                .then(user => {
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.status(200).send(user);
                                })
                                .catch(error => {
                                    res.setHeader('Access-Control-Allow-Origin', '*');
                                    res.status(400).send('No se encontro el usuario: ' + id);
                                });
    },

    searchCreate: (req, res) => { //Esta ruta se encarga de verificar si ya existe el email con el que se creara un nuevo usuario
        const Qemail = req.params.email;
        console.log("Buscando con email: " + Qemail)


        User.find({email: Qemail})
                .then(user => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).send(user);
                })
                .catch(error => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(400).send('No se encontro el usuario: ' + id);
                });
    },

    searchLogin: (req, res) => { //Esta ruta se encarga de verificar si el email y contraseña son correctos
        let loginCheck = {
            Lemail: req.body.email,
            Lpassword: req.body.password
        };


        User.findOne({email: loginCheck.Lemail, password: loginCheck.Lpassword})
                .then(user => {
                    // Si encontro al usuario, generamos el token
                    const token = jwt.sign({
                        id: user._id,
                        name: user.name, 
                        email: user.email,
                        type: user.type 
                    }, key);

                    res.status(200).send({user, token});
                })
                .catch(error => {
                    console.log(error)
                    res.status(400).send('No se encontro el usuario');
                });
    },

    loadUser: (req, res) => {
        const token = req.params.token;

        let temp = jwt.decode(token, key);

        User.findById(temp.id).populate('history')
                .then(user => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(200).send(user);
                })
                .catch(error => {
                    res.setHeader('Access-Control-Allow-Origin', '*');
                    res.status(400).send('No se encontro el usuario con ese token');
                });        
    },

    googleLogin: (req, res) => {
        const idToken = req.body.googleToken;

        googleClient.verifyIdToken({ idToken: idToken }).then(response => {
            const user = response.getPayload();
            // registrar ususario si no existe y sino validar que existe el usuario y mandar el token correcto
            User.findOne({email: user.email})
            .then(user => {
                // Si encontro al usuario, generamos el token
                console.log(user)
                const token = jwt.sign({
                    id: user._id,
                    name: user.name, 
                    email: user.email,
                    type: user.type 
                }, key);

                res.status(200).send({user, token});
            })
            .catch(error => {
                let newUser = {
                    email: user.email,
                    password: "",
                    name: user.given_name,
                    type: "Cliente",
                    history: [],
                    status: "ok",
                    image: user.picture
                };
        
                console.log(newUser);
        
                User(newUser).save()
                                .then(user => {

                                    const token = jwt.sign({
                                        id: user._id,
                                        name: user.name, 
                                        email: user.email,
                                        type: user.type 
                                    }, key);

                                    res.status(201).send({user, token});
                                })
                                .catch(error => {
                                    res.status(400).send('No se pudo crear el usuario');
                                });
            });
        }).catch(err => {
            res.status(401).send({ msg: 'token invalido' });
        })
    }
}

module.exports = UsersController;