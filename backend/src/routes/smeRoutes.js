const express = require('express');
const router = express.Router();
const smeController = require('../controllers/smeController');
const verifyToken = require('../middleware/verifyToken');
const smeValidation = require('../middleware/smeValidation');
const { validationResult } = require('express-validator');

// Route to create an SME
router.post('/create', verifyToken, smeValidation, smeController.createSME);

module.exports = smeRouter;