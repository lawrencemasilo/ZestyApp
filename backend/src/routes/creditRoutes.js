const express = require("express");
const router = express.Router();
const { assessCredit, updateCreditScore, getCreditScore } = require("../controllers/creditController");

// Credit Assessment
router.post("/assess", assessCredit);
router.patch("/update", updateCreditScore);
router.get("/:sme_id", getCreditScore);

module.exports = router;
