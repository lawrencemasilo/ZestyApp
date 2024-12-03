const express = require('express');
const router = express.Router();
const sme = require('../controllers/smeController');
const authMiddleware = require('../middleware/authMiddleware');
const smeValidation = require('../middleware/smeValidation');

// Create SME
router.post('/create', authMiddleware, smeValidation, sme.createSME);

// Get SME Profile by ID
router.get('/:id', authMiddleware, sme.getSMEProfile);

// Update SME
router.put('/:id', authMiddleware, smeValidation, sme.updateSME);

// Delete SME
router.delete('/:id', authMiddleware, sme.deleteSME);

module.exports = smeRouter;