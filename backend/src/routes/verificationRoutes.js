const express = require("express");
const router = express.Router();
const { verifyDocuments, verifyBusiness } = require("../controllers/verificationController");

// Verification Operations
router.post("/documents", verifyDocuments); // Verify documents
router.post("/business", verifyBusiness); // Verify business

module.exports = router;
