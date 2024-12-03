// controllers/smeController.js
const SME = require("../models/SME");

// Middleware for verifying the JWT token (example)
const verifyToken = require("../middleware/authMiddleware");

exports.createSME = async (req, res) => {
  const {
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
  } = req.body;

  try {
    // Verify JWT token
    if (!req.user) {
      return res.status(403).json({ message: "Access denied. Please log in." });
    }

    // Check for duplicate registration_number or tax_id
    const existingSME = await SME.findOne({
      $or: [{ registration_number }, { tax_id }],
    });
    if (existingSME) {
      return res.status(400).json({ message: "SME with provided details already exists." });
    }

    // Validate management team details
    if (!Array.isArray(management_team) || management_team.length === 0) {
      return res.status(400).json({ message: "Management team details are required." });
    }

    for (const member of management_team) {
      if (!member.name || !member.role || !member.id_number) {
        return res.status(400).json({ message: "Each management team member must have a name, role, and ID number." });
      }
    }

    // Check if all required documents are provided
    const requiredDocs = [
      "Tax Certificate",
      "Company Registration",
      "Proof of Residence",
      "Bank Statement",
      "Contact Person ID",
      "Management Team IDs",
    ];
    const providedDocs = support_documents.map((doc) => doc.name);
    const missingDocs = requiredDocs.filter((doc) => !providedDocs.includes(doc));

    if (missingDocs.length > 0) {
      return res.status(400).json({
        message: `Missing required documents: ${missingDocs.join(", ")}`,
      });
    }

    // Create new SME
    const sme = await SME.create({
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

    res.status(201).json({
      message: "SME created successfully.",
      sme,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};