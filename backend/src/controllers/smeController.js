const SME = require("../models/SME");
const { assessCredit } = require("./creditController");
const { updateUser } = require("./userController");

const saveBusinessInfo = async (req, res) => {
  try {
    const { user_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const {
      business_name,
      industry,
      registration_number,
      tax_id,
      monthly_revenue,
      address,
      contact_person,
      bank_details,
    } = req.body;

    // Validate business details
    const isRegistrationValid = /^[A-Z0-9]{10}$/.test(registration_number);
    const isTaxValid = /^[0-9]{9}$/.test(tax_id);

    if (!isRegistrationValid || !isTaxValid) {
      return res.status(400).json({
        message: "Invalid business registration number or tax ID.",
      });
    }

    // Check if business already exists
    const existingSme = await SME.findOne({ registration_number });
    if (existingSme) {
      return res.status(400).json({
        message: "Business already exists with this registration number.",
      });
    }

    // Save new business
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

    // Update user verification
    await updateUserVerification(user_id);

    // Trigger credit assessment
    try {
      await triggerCreditAssessment(newSme._id);
    } catch (creditErr) {
      console.error("Credit assessment failed:", creditErr);
    }

    // Final response
    return res.status(201).json({
      message: "Business information saved successfully.",
      sme: newSme,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error saving business information." });
  }
};

// Helper function to update user verification
const updateUserVerification = async (user_id) => {
  try {
    await updateUser(
      {
        params: { id: user_id },
        body: { verified: true },
      },
      {
        status: (statusCode) => ({
          json: (data) => {
            if (statusCode >= 400) {
              throw new Error(`Failed to update user: ${data.error}`);
            }
            console.log(`User update successful: ${data.message}`);
          },
        }),
      }
    );
  } catch (err) {
    console.error("Failed to update user verification:", err);
    throw new Error("User verification update failed.");
  }
};

// Helper function to trigger credit assessment
const triggerCreditAssessment = async (sme_id) => {
  const creditAssessmentReq = { body: { sme_id: sme_id.toString() } };
  const creditAssessmentRes = {
    status: (statusCode) => ({
      json: (response) =>
        console.log(`Credit Status ${statusCode}:`, response),
    }),
  };
  await assessCredit(creditAssessmentReq, creditAssessmentRes);
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
        /*documents: {
          revenue_proof: sme.documents.revenue_proof ? '[DOCUMENT URL]' : null,
          tax_returns: sme.documents.tax_returns ? '[DOCUMENT URL]' : null,
          bank_statements: sme.documents.bank_statements ? '[DOCUMENT URL]' : null
        }*/
      }
    });
  } catch (err) {
    console.error("Error retrieving business information:", err);
    res.status(500).json({ message: "Error retrieving business information." });
  }
};

module.exports = { saveBusinessInfo, getBusinessInfo };