const routes = require('express').Router();
const usersController = require('../controllers/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');  

// Swagger UI Route
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

//users routes here
routes.get('/', usersController.getAll);

routes.get('/:id', usersController.getOne);

routes.post('/', usersController.createUser);

routes.put('/:id', usersController.updateUser);

routes.delete('/:id', usersController.deleteUser);

module.exports = routes;
