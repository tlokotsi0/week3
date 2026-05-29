const { body, validationResult } = require('express-validator');

const userValidationRules = [
  body('firstName').trim().escape().notEmpty().withMessage('First name is required'),
  body('lastName').trim().escape().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Must be a valid email'),
  body('favoriteColor').trim().escape(),
  body('birthday').trim().escape(),
  body('maritalStatus').trim().escape(),
  body('numberOfChildren').isInt({ min: 0 }).withMessage('Must be a valid number')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userValidationRules,
  validate,
};