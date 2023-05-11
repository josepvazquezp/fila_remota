const express = require('express');
const router = express.Router();
const controller = require('./../controllers/chats');

/**
 * @swagger
 * /chats:
 *  post:
 *    desription: create chat
 *    parameters:
 *      - in: body
 *        name: create
 *        description: JSON => customerId and restaurantId
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      201:
 *        description: post create chat
 *      400:
 *        description: bad request
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /chats/{id}:
 *  put:
 *    desription: update chat
 *    parameters:
 *      - in: path
 *        name: id
 *        description: chat id 
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: update
 *        description: JSON => any value
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: put update chat
 *      400:
 *        description: bad request
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /chats:
 *  get:
 *    desription: list chats
 *    responses:
 *      200:
 *        description: get chats
 *      400:
 *        description: bad request
 */
router.get('/', controller.list);

/**
 * @swagger
 * /chats/{id}:
 *  get:
 *    description: search chat
 *    parameters:
 *      - in: path
 *        name: id
 *        description: chat id 
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get chat
 *      400:
 *        description: bad request
 */
router.get('/:id', controller.search);

/**
 * @swagger
 * /chats/{id}:
 *  delete:
 *    desription: delete chat
 *    parameters:
 *      - in: path
 *        name: id
 *        description: chat id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: delete chat
 *      400:
 *        description: bad request
 */
router.delete('/:id', controller.delete);

router.post("/find", express.json(), controller.findChat);

//router.post("/restaurant", express.json(), controller.findClientChat);

router.post("/allmine", express.json(), controller.findAllMine);

module.exports = router;