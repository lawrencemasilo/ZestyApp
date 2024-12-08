const SME = require("../models/SME");

const verifyDocuments = async (req, res) => {
    const { registration_number, tax_id, bank_details } = req.body;

    // Mock validation logic
    const isValidRegistration = /^[A-Z0-9]{10}$/.test(registration_number);
    const isValidTaxID = /^[0-9]{9}$/.test(tax_id);
    const isValidBankDetails = bank_details.account_number && bank_details.bank_name;

    if (isValidRegistration && isValidTaxID && isValidBankDetails) {
        return res.status(200).json({ message: "Documents verified successfully" });
    }

    res.status(400).json({ message: "Document verification failed" });
};



const verifyBusiness = async (req, res) => {
    try {
      const { registration_number, tax_id } = req.body;
  
      // Validate the format of registration_number and tax_id
      const isRegistrationValid = /^[A-Z0-9]{10}$/.test(registration_number);
      const isTaxValid = /^[0-9]{9}$/.test(tax_id);
  
      if (!isRegistrationValid || !isTaxValid) {
        return res.status(400).json({ message: "Invalid business registration number or tax ID." });
      }
  
      // Check if the business exists in the database
      const existingBusiness = await SME.findOne({ registration_number, tax_id });
      if (existingBusiness) {
        return res.status(200).json({ 
          message: "Business exists in the database.", 
          business: existingBusiness 
        });
      }
  
      res.status(404).json({ message: "Business not found." });
    } catch (err) {
      console.error("Error verifying business:", err);
      res.status(500).json({ message: "Server error while verifying business." });
    }
};

module.exports = { verifyDocuments, verifyBusiness };
