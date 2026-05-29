const routes = require('express').Router();
const usersController = require('../controllers/users');
const { userValidationRules, validate } = require('../middleware/validateUsers');

routes.get('/', usersController.getAll);
routes.get('/:id', usersController.getOne);
routes.post('/', productValidationRules, validate, usersController.createProduct);
routes.put('/:id', productValidationRules, validate, usersController.updateProduct);
routes.delete('/:id', usersController.deleteUser);

module.exports = routes;