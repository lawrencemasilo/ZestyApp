const express = require("express");
const router = express.Router();

// Import Controllers
const { saveBusinessInfo, getBusinessInfo } = require("../controllers/smeController.js");

// ** SME Business Information **
// Save business information for the given user ID
router.post("/:user_id", saveBusinessInfo);

// Get business information for a specific user
router.get("/:user_id", getBusinessInfo);

module.exports = router;
