const SME = require('../models/SME');
const { validationResult } = require('express-validator');

// Create SME
exports.createSME = async (req, res) => {
  const { business_name, industry, registration_number, tax_id, monthly_revenue, address, contact_person, management_team, bank_details, support_documents } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.user) {
      return res.status(403).json({ message: 'Access denied. Please log in.' });
    }

    const existingSME = await SME.findOne({ $or: [{ registration_number }, { tax_id }] });
    if (existingSME) {
      return res.status(400).json({ message: 'SME with the same registration number or tax ID already exists.' });
    }

    const sme = new SME({
      business_name,
      industry,
      registration_number,
      tax_id,
      monthly_revenue,
      address,
      contact_person,
      management_team,
      bank_details,
      support_documents,
    });

    await sme.save();

    res.status(201).json({ message: 'SME created successfully.', sme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get SME Profile by ID
exports.getSMEProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const sme = await SME.findById(id);
    if (!sme) {
      return res.status(404).json({ message: 'SME not found.' });
    }

    res.status(200).json({ sme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update SME
exports.updateSME = async (req, res) => {
  const { id } = req.params;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const sme = await SME.findById(id);

    if (!sme) {
      return res.status(404).json({ message: 'SME not found.' });
    }

    const updates = req.body;
    Object.assign(sme, updates);

    await sme.save();

    res.status(200).json({ message: 'SME updated successfully.', sme });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete SME
exports.deleteSME = async (req, res) => {
  try {
    const { id } = req.params;

    const sme = await SME.findById(id);
    if (!sme) {
      return res.status(404).json({ message: 'SME not found.' });
    }

    await sme.remove();

    res.status(200).json({ message: 'SME deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};