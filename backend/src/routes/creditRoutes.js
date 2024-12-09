const express = require("express");
const router = express.Router();
const { assessCredit, updateCreditScore } = require("../controllers/creditController");

// Credit Assessment
router.post("/assess", assessCredit);
router.post("/update", updateCreditScore);

module.exports = router;
