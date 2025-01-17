const express = require("express");
const router = express.Router();
const { 
  createBnplCredit, 
  getActiveBnplCredits, 
  updateBnplCreditStatus 
} = require("../controllers/bnplCreditController");

// BNPL Credit Operations
router.post("/", createBnplCredit); // Create a new BNPL credit
router.get("/:sme_id", getActiveBnplCredits); // Get active BNPL credits
router.patch("/:credit_id", updateBnplCreditStatus); // Update BNPL credit status

module.exports = router;
