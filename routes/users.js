const routes = require('express').Router();
const usersController = require('../controllers/users');
const { userValidationRules, validate } = require('../middleware/validateUsers');

routes.get('/', usersController.getAll);
routes.get('/:id', usersController.getOne);
routes.post('/', userValidationRules, validate, usersController.createUser);
routes.put('/:id', userValidationRules, validate, usersController.updateUser);
routes.delete('/:id', usersController.deleteUser);

module.exports = routes;