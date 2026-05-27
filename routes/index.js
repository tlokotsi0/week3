const routes = require('express').Router();
const usersController = require('../controllers/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');  
const { userValidationRules, validate } = require('../middleware/validate');

// Swagger UI Route
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Root Routes
routes.get('/', usersController.getAll);
routes.post('/', userValidationRules, validate, usersController.createUser);

// Parameterized Routes
routes.get('/:id', usersController.getOne);
routes.put('/:id', userValidationRules, validate, usersController.updateUser);
routes.delete('/:id', usersController.deleteUser);

module.exports = routes;
