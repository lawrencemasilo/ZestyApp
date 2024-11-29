const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const auth = require("../middleware/auth");

// Public Routes
router.post("/register", user.registerUser);
router.post("/login", auth.loginUser);

// Protected Routes
router.get("/profile", user, auth.getUserProfile);

module.exports = router;