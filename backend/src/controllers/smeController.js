const SME = require("../models/SME");
const { assessCredit } = require("./creditController"); 

const saveBusinessInfo = async (req, res) => {
  try {
    const { user_id } = req.params; // User ID from the frontend
    const { 
      business_name, 
      industry, 
      registration_number, 
      tax_id, 
      monthly_revenue, 
      address, 
      contact_person, 
      bank_details,
      documents
    } = req.body;

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

    // Validate document URLs
    /*if (!documents || !documents.revenue_proof || !documents.tax_returns || !documents.bank_statements) {
      return res.status(400).json({ message: "All documents (revenue proof, tax returns, bank statements) are required." });
    }*/

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
      documents: {
        revenue_proof: documents.revenue_proof,
        tax_returns: documents.tax_returns,
        bank_statements: documents.bank_statements
      }
    });

    // Save SME information
    await newSme.save();

    // Trigger credit assessment
    try {
      const creditAssessmentReq = {
        body: {
          sme_id: newSme._id, 
          documents: {
            revenueProof: documents.revenue_proof,
            taxReturns: documents.tax_returns,
            bankStatements: documents.bank_statements
          }
        }
      };

      const creditAssessmentRes = {
        status: (statusCode) => ({
          json: (response) => {
            // This is a mock response method to match Express response object
            console.log(`Credit Assessment Status ${statusCode}:`, response);
            return { statusCode, response };
          }
        })
      };

      await assessCredit(creditAssessmentReq, creditAssessmentRes);
    } catch (creditErr) {
      console.error("Credit assessment failed:", creditErr);
      // Note: We don't return an error here as the SME was successfully saved
    }

    res.status(201).json({ 
      message: "Business information saved successfully. Credit assessment initiated.", 
      sme: newSme 
    });
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

    res.status(200).json({ 
      message: "Business information retrieved successfully.", 
      sme: {
        ...sme.toObject(),
        // Optionally, you might want to sanitize or partially hide document URLs
        documents: {
          revenue_proof: sme.documents.revenue_proof ? '[DOCUMENT URL]' : null,
          tax_returns: sme.documents.tax_returns ? '[DOCUMENT URL]' : null,
          bank_statements: sme.documents.bank_statements ? '[DOCUMENT URL]' : null
        }
      }
    });
  } catch (err) {
    console.error("Error retrieving business information:", err);
    res.status(500).json({ message: "Error retrieving business information." });
  }
};

module.exports = { saveBusinessInfo, getBusinessInfo };