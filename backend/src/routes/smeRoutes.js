const express = require("express");
const router = express.Router();
const { saveBusinessInfo } = require("../controllers/smeController.js");

// SME Business Information
router.post("/:user_id", saveBusinessInfo);

module.exports = router;
