const routes = require('express').Router();
const usersController = require('../controllers/users');
const { productValidationRules, validate } = require('../middleware/validateUsers');

routes.get('/', productsController.getAll);
routes.get('/:id', productsController.getOne);
routes.post('/', productValidationRules, validate, productsController.createProduct);
routes.put('/:id', productValidationRules, validate, productsController.updateProduct);
routes.delete('/:id', productsController.deleteUser);

module.exports = routes;