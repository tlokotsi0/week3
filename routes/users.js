const routes = require('express').Router();
const usersController = require('../controllers/users');
const { userValidationRules, validate } = require('../middleware/validateUsers');
const { isAuthanticated } = require('../middleware/authanticate');

routes.get('/', isAuthanticated, usersController.getAll);
routes.get('/:id', isAuthanticated, usersController.getOne);
routes.post('/', isAuthanticated, userValidationRules, validate, usersController.createUser);
routes.put('/:id', isAuthanticated, userValidationRules, validate, usersController.updateUser);
routes.delete('/:id', isAuthanticated, usersController.deleteUser);

module.exports = routes;