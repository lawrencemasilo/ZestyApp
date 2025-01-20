const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const { verifyDocuments, verifyBusiness } = require("../controllers/verificationController");

// Verification Operations
router.post(
    "/documents",
    upload.array("documents", 5), // Allow up to 5 files to be uploaded
    verifyDocuments); // Verify documents

router.post("/business", verifyBusiness); // Verify business

module.exports = router;
