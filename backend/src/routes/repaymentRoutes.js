const express = require("express");
const router = express.Router();
const { processRepayment, getRepaymentsByCredit } = require("../controllers/repaymentsController");

// Repayment Operations
router.post("/:repayment_id", processRepayment); // Process a repayment
router.get("/:credit_id", getRepaymentsByCredit); // Get repayments for a specific credit

module.exports = router;
