const routes = require('express').Router();
const productsController = require('../controllers/products');
const { productValidationRules, validate } = require('../middleware/validateProducts');

routes.get('/', productsController.getAll);
routes.get('/:id', productsController.getOne);
routes.post('/', productValidationRules, validate, productsController.createProduct);
routes.put('/:id', productValidationRules, validate, productsController.updateProduct);
routes.delete('/:id', productsController.deleteProduct);

module.exports = routes;