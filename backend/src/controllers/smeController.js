const SME = require("../models/SME");

const saveBusinessInfo = async (req, res) => {
  try {
    const { user_id } = req.params; // User ID from the frontend
    const { business_name, industry, registration_number, tax_id, monthly_revenue, address, contact_person, bank_details } = req.body;

    // Verify business registration and tax ID
    const isRegistrationValid = /^[A-Z0-9]{10}$/.test(registration_number);
    const isTaxValid = /^[0-9]{9}$/.test(tax_id);

    if (!isRegistrationValid || !isTaxValid) {
      return res.status(400).json({ message: "Invalid business registration number or tax ID." });
    }

    // Check if SME already exists
    const existingSme = await SME.findOne({ registration_number });
    if (existingSme) {
      return res.status(400).json({ message: "Business already exists with this registration number." });
    }

    // Create SME and link to user
    const newSme = new SME({
      user_id,
      business_name,
      industry,
      registration_number,
      tax_id,
      monthly_revenue,
      address,
      contact_person,
      bank_details,
    });

    await newSme.save();

    res.status(201).json({ message: "Business information saved successfully.", sme: newSme });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving business information." });
  }
};

const getBusinessInfo = async (req, res) => {
  try {
    const { user_id } = req.params;

    // Find the SME record associated with the user_id
    const sme = await SME.findOne({ user_id });

    if (!sme) {
      return res.status(404).json({ message: "Business information not found for this user." });
    }

    res.status(200).json({ message: "Business information retrieved successfully.", sme });
  } catch (err) {
    console.error("Error retrieving business information:", err);
    res.status(500).json({ message: "Error retrieving business information." });
  }
};

module.exports = { saveBusinessInfo, getBusinessInfo };
