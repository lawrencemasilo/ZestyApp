const express = require("express");
const upload = require("../middleware/multer");
const router = express.Router();
const { verifyDocuments, verifyBusiness } = require("../controllers/verificationController");
const authMiddleware = require("../middleware/authMiddleware");

// Verification Operations
router.post(
    "/documents",
    authMiddleware,
    upload.array("documents", 5),
    (req, res, next) => {
        //Handle multer errors
        upload.array("documents", 5)(req, res, (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            verifyDocuments(req, res);
        });
    }
);

router.post("/business", verifyBusiness); // Verify business

module.exports = router;
