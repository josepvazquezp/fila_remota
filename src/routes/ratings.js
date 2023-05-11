const express = require('express');
const router = express.Router();
const controller = require('./../controllers/ratings');

/**
 * @swagger
 * /ratings:
 *  post:
 *    desription: add a new rating
 *    parameters:
 *      - in: body
 *        name: create
 *        description: JSON => Evaluator ID, Evaluated ID, Rating number 0 to 5 and Description
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      201:
 *        description: post create a rating
 *      400:
 *        description: bad request
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /ratings/{id}:
 *  put:
 *    desription: update a rating value
 *    parameters:
 *      - in: path
 *        name: id
 *        description: rating id
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: update
 *        description: JSON => update rating value
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: put update a rating
 *      400:
 *        description: bad request
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /ratings:
 *  get:
 *    desription: list of all ratings in DB
 *    responses:
 *      200:
 *        description: get ratings
 *      400:
 *        description: bad request
 */
router.get('/', controller.list);

/**
 * @swagger
 * /ratings/{id}:
 *  get:
 *    description: search for a specific rating
 *    parameters:
 *      - in: path
 *        name: id
 *        description: rating id 
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get a specific rating
 *      400:
 *        description: bad request
 */
router.get('/:id', controller.search);

/**
 * @swagger
 * /ratings/{id}:
 *  delete:
 *    desription: delete a rating
 *    parameters:
 *      - in: path
 *        name: id
 *        description: rating id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: delete the rating
 *      400:
 *        description: bad request
 */
router.delete('/:id', controller.delete);

module.exports = router;