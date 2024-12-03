// middleware/smeValidation.js
const { body } = require('express-validator');

module.exports = [
  body('business_name').notEmpty().withMessage('Business name is required'),
  body('industry').notEmpty().withMessage('Industry is required'),
  body('registration_number').notEmpty().withMessage('Registration number is required'),
  body('tax_id').notEmpty().withMessage('Tax ID is required'),
  body('monthly_revenue').isNumeric().withMessage('Monthly revenue should be a number'),
  body('address').notEmpty().withMessage('Address is required'),
  body('contact_person.name').notEmpty().withMessage('Contact person name is required'),
  body('contact_person.email').isEmail().withMessage('Valid email is required'),
  body('contact_person.phone').isMobilePhone().withMessage('Valid phone number is required'),
  body('management_team').isArray().withMessage('Management team should be an array of members'),
  body('bank_details.account_number').notEmpty().withMessage('Bank account number is required'),
  body('support_documents').isArray().withMessage('Support documents should be an array of files'),
];