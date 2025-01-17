const express = require("express");
const router = express.Router();
const {
  addSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
} = require("../controllers/supplierController");

// Add a new supplier
router.post("/", addSupplier);

// Get all suppliers
router.get("/", getSuppliers);

// Get a specific supplier by ID
router.get("/:supplier_id", getSupplierById);

// Update a supplier
router.patch("/:supplier_id", updateSupplier);

module.exports = router;
