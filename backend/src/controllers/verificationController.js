const SME = require("../models/SME");
const Path = require("path");

const verifyDocuments = async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    console.log("User:", req.user);
    console.log("Files:", req.files);
    console.log("Body:", req.body);
    
    const { registration_number, tax_id, bank_details, documentType } = req.body;
    const files = req.files; // Uploaded files handled by multer middleware

    // validate user authentication
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }

    // Here we want to validate inputs and uploaded files
    const isValidRegistration = /^[A-Z0-9]{10}$/.test(registration_number);
    const isValidTaxID = /^[0-9]{9}$/.test(tax_id);
    const isValidBankDetails = bank_details && bank_details.account_number && bank_details.bank_name;

    if (!isValidRegistration) {
      return res.status(400).json({ message: "Invalid registration number format." });
    }
    if (!isValidTaxID) {
      return res.status(400).json({ message: "Invalid tax ID format." });
    }
    if (!isValidBankDetails) {
      return res.status(400).json({ message: "Invalid or missing bank details." });
    }

    // validate document type
    const validDocumentTypes = ["tax_certificate", "bank_statement", "identity_proof"];
    if (!documentType || !validDocumentTypes.includes(documentType)) {
      return res.status(400).json({ message: "Invalid or missing document type." });
    }

    if (!files || files.length === 0) {
      return res
        .status(400)
        .json({ message: "No files uploaded for verification" });
    }

    //check is sme exists on the database
    let sme = await SME.findOne({ registration_number, tax_id });
    if (!sme) {
      // Create a new SME document if it doesn't exist
      sme = new SME({
        user_id: req.user.id,
        registration_number,
        tax_id,
        bank_details,
        business_name: req.user.business_name || "Unknown Business",
        industry: req.user.industry || "Unknown Industry",
        monthly_revenue: req.user.monthly_revenue || 0,
        address: req.user.address || { physical: "", operational: "" },
        contact_person: req.user.contact_person || {},
        documents: [], // initialize documents array
      });
    }

    //Add uploaded document details to the SME
    const documentDetails = files.map((file) => ({
      type: documentType,
      fileName: file.originalname,
      filePath: path.normalize(file.path),
      fileType: file.mimetype,
    }));

    sme.documents = sme.documents.concat(documentDetails); // append new documents to the existing list

    // save the sme with the updated documents
    await sme.save();

    res
      .status(200)
      .json({ message: "Documents verified and saved successfully.", SME: sme });
  } catch (err) {
    console.error("Error verifying documents:", err.message || err);
    res.status(500).json({ message: "Server error while verifying documents.", error: err.message || err });
  }
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
