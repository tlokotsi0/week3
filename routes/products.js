const routes = require('express').Router();
const productsController = require('../controllers/products');
const { productValidationRules, validate } = require('../middleware/validateProducts');
const { isAuthanticated } = require('../middleware/authanticate');

routes.get('/', isAuthanticated, productsController.getAll);
routes.get('/:id', isAuthanticated, productsController.getOne);
routes.post('/', isAuthanticated, productValidationRules, validate, productsController.createProduct);
routes.put('/:id', isAuthanticated, productValidationRules, validate, productsController.updateProduct);
routes.delete('/:id', isAuthanticated, productsController.deleteProduct);

module.exports = routes;