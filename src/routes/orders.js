const express = require('express');
const router = express.Router();
const controller = require('./../controllers/orders');

/**
 * @swagger
 * /orders:
 *  post:
 *    desription: create order
 *    parameters:
 *      - in: body
 *        name: create
 *        description: JSON => customerId, restaurantId, total, product and quantity 
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      201:
 *        description: post create order
 *      400:
 *        description: bad request
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /orders/{id}:
 *  put:
 *    desription: update order
 *    parameters:
 *      - in: path
 *        name: id
 *        description: order id 
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
 *        description: put update rder
 *      400:
 *        description: bad request
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /orders:
 *  get:
 *    desription: list orders
 *    responses:
 *      200:
 *        description: get orders
 *      400:
 *        description: bad request
 */
router.get('/', controller.list);

/**
 * @swagger
 * /orders/{id}:
 *  get:
 *    description: search order
 *    parameters:
 *      - in: path
 *        name: id
 *        description: order id 
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get order
 *      400:
 *        description: bad request
 */
router.get('/:id', controller.search);

/**
 * @swagger
 * /orders/{id}:
 *  delete:
 *    desription: delete order
 *    parameters:
 *      - in: path
 *        name: id
 *        description: order id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: delete order
 *      400:
 *        description: bad request
 */
router.delete('/:id', controller.delete);

module.exports = router;