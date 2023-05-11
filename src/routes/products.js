const express = require('express');
const router = express.Router();
const controller = require('./../controllers/products');

const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../proyecto-ui/src/assets/uploads');                    
    },
    filename: (req, file, cb) => {
        const nombre = req.params.id;
        console.log(nombre);
        const extention = file.originalname.split('.').pop();
        cb(null, `${nombre}.${extention}`);
    }
});

const fileFilter = (req, file, cb) => {
    const flag = file.mimetype.startsWith('image');
    cb(null, flag);
};

const upload = multer({storage: multerStorage, fileFilter: fileFilter});

router.post('/upload/:id', upload.single('file'), (req, res) => {
    res.status(201).send({image: req.file.filename});
}); 

/**
 * @swagger
 * /products:
 *  post:
 *    desription: add a new product
 *    parameters:
 *      - in: body
 *        name: create
 *        description: JSON => Name, Description, Price, RestaurantId
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      201:
 *        description: post create product
 *      400:
 *        description: bad request
 */
router.post('/', express.json(), controller.create);

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    desription: update a product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: product id 
 *        required: true
 *        schema:
 *          type: string
 *      - in: body
 *        name: update
 *        description: JSON => update any value
 *        required: true
 *        schema: 
 *          type: string
 *    responses:
 *      200:
 *        description: put update a product
 *      400:
 *        description: bad request
 */
router.put('/:id', express.json(), controller.update);

/**
 * @swagger
 * /products:
 *  get:
 *    desription: list of all products
 *    responses:
 *      200:
 *        description: get products
 *      400:
 *        description: bad request
 */
router.get('/', controller.list);

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    description: search for a product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: product id 
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get an specific product
 *      400:
 *        description: bad request
 */
router.get('/:id', controller.search);

/**
 * @swagger
 * /products/filter/{filter}:
 *  get:
 *    description: filter products
 *    parameters:
 *      - in: path
 *        name: filter
 *        description: product filter
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: get products
 *      400:
 *        description: bad request
 */
router.get('/filter/:filter', controller.search_in);

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    desription: delete a product
 *    parameters:
 *      - in: path
 *        name: id
 *        description: product id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: delete the product
 *      400:
 *        description: bad request
 */
router.delete('/:id', controller.delete);

module.exports = router;