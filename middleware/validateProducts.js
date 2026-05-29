const { body, validationResult } = require('express-validator');

const productValidationRules = [
  body('name').trim().escape().notEmpty().withMessage('Product name is required'),
  body('quantity').isInt({ min: 0 }).withMessage('Must be a valid number'),
  body('price').trim().escape(),
  body('color').trim().escape()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  productValidationRules,
  validate,
};