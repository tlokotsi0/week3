const routes = require('express').Router();
const usersController = require('../controllers/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');  
const { userValidationRules, validate } = require('../middleware/validateUsers');

// Swagger UI Route
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

//routes
routes.use('/users', require('./users'));
routes.use('/products', require('./products'));
module.exports = routes;
