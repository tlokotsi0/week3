const routes = require('express').Router();
const usersController = require('../controllers/users');
const { userValidationRules, validate } = require('../middleware/validateUsers');
const { isAuthenticated } = require('../middleware/authenticate');

routes.get('/', isAuthenticated, usersController.getAll);
routes.get('/:id', isAuthenticated, usersController.getOne);
routes.post('/', isAuthenticated, userValidationRules, validate, usersController.createUser);
routes.put('/:id', isAuthenticated, userValidationRules, validate, usersController.updateUser);
routes.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = routes;