const express = require('express');
const smeController = require('../controllers/smeController');
const authMiddleware = require('../middleware/authMiddleware');
const smeValidation = require('../middleware/smeValidation');
const { validationResult } = require('express-validator');

// Route to create an SME
router.post('/sme', authMiddleware, smeValidation, smeController.createSME);

module.exports = smeRouter;