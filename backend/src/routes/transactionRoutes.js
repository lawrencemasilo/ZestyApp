const express = require("express");
const router = express.Router();
const { 
  createTransaction, 
  getTransactions, 
  getRepayments 
} = require("../controllers/transactionController");

// Transaction Operations
router.post("/", createTransaction); // Create a new transaction
router.get("/:sme_id", getTransactions); // Get all transactions for an SME
router.get("/:sme_id/repayments", getRepayments); // Get all repayments for an SME

module.exports = router;
