const express = require("express");
const router = express.Router();
const { assessCredit } = require("../controllers/creditController");

// Credit Assessment
router.post("/assess", assessCredit);

module.exports = router;
