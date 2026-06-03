const routes = require('express').Router();
const productsController = require('../controllers/products');
const { productValidationRules, validate } = require('../middleware/validateProducts');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', isAuthenticated, productsController.getAll);
routes.get('/:id', isAuthenticated, productsController.getOne);
routes.post('/', isAuthenticated, productValidationRules, validate, productsController.createProduct);
routes.put('/:id', isAuthenticated, productValidationRules, validate, productsController.updateProduct);
routes.delete('/:id', isAuthenticated, productsController.deleteProduct);

module.exports = routes;