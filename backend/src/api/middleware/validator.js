const { body, validationResult } = require("express-validator");

// Validation rules for user creation
const userValidationRules = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("firstName")
    .notEmpty().withMessage("First name is required")
    .isString().withMessage("First name must be a string")
    .isLength({ min: 3 }).withMessage("First name must be at least 3 characters")
    .isLength({ max: 50 }).withMessage("First name must not exceed 50 characters"),
  body("lastName")
    .notEmpty().withMessage("Last name is required")
    .isString().withMessage("Last name must be a string")
    .isLength({ min: 3 }).withMessage("Last name must be at least 3 characters")
    .isLength({ max: 50 }).withMessage("Last name must not exceed 50 characters"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isString().withMessage("Password must be a string"),
  body("phone")
    .optional() // Optional field
    .isString().withMessage("Phone number must be a string")
    .matches(/^\+?[1-9]\d{1,14}$/).withMessage("Invalid phone number format"), // Follows E.164 format
];

// Validation rules for user login
const loginValidationRules = [
  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Invalid email format"),
  body("password")
    .notEmpty().withMessage("Password is required")
    .isString().withMessage("Password must be a string"),
];

// Validation rules for refreshing a token
const refreshTokenValidationRules = [
  body("refreshToken")
    .notEmpty().withMessage("Refresh token is required")
    .isUUID().withMessage("Invalid refresh token format"),
];

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorsArray = errors.array().map(err => ({
    [err.param]: err.msg,
  }));

  return res.status(422).json({ errors: errorsArray });
};

module.exports = {
  userValidationRules,
  loginValidationRules,
  refreshTokenValidationRules,
  validate,
};