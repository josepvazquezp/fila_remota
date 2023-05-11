const express = require('express');
const router = express.Router();
const controller = require('./../controllers/mastercards');

/**
 * @swagger
 * /cards:
 *  post:
 *    desription: add a new card to an user
 *    parameters:
 *      - in: body
 *        name: create
 *        description: JSON => User ID, Type, Number, Date
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      201:
 *        description: post create card
 *      400:
 *        description: bad request
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /cards/{id}:
 *  put:
 *    desription: update a card data
 *    parameters:
 *      - in: path
 *        name: id
 *        description: card id 
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: update
 *        description: JSON => update numerical data
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: put update a card
 *      400:
 *        description: bad request
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /cards:
 *  get:
 *    desription: list of all cards in DB
 *    responses:
 *      200:
 *        description: get cards
 *      400:
 *        description: bad request
 */
router.get('/', controller.list);

/**
 * @swagger
 * /cards/{id}:
 *  get:
 *    description: search for a specific card
 *    parameters:
 *      - in: path
 *        name: id
 *        description: card id 
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get an specific card
 *      400:
 *        description: bad request
 */
router.get('/:id', controller.search);

/**
 * @swagger
 * /cards/{id}:
 *  delete:
 *    desription: delete a card
 *    parameters:
 *      - in: path
 *        name: id
 *        description: card id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: delete the card
 *      400:
 *        description: bad request
 */
router.delete('/:id', controller.delete);

router.get('/lookc/:number', controller.searchCreate);

router.get('/looku/:user', controller.listUserCards);

module.exports = router;