const routes = require('express').Router();
const usersController = require('../controllers/users');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { userValidationRules, validate } = require('../middleware/validateUsers');
const { productValidationRules } = require('../middleware/validateProducts');

// Swagger UI Route
routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument));

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


//routes
routes.use('/users', require('./users'));
routes.use('/products', require('./products'));

module.exports = routes;
