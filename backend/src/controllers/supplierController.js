const Supplier = require("../models/Suppliers");

// Add a new supplier
const addSupplier = async (req, res) => {
  try {
    const {
      business_name,
      contact_email,
      phone,
      industry,
      bank_details,
    } = req.body;

    // Generate a unique API key
    const api_key = Math.random().toString(36).substr(2, 16).toUpperCase();

    const newSupplier = new Supplier({
      business_name,
      contact_email,
      phone,
      industry,
      api_key,
      bank_details,
    });

    await newSupplier.save();

    res.status(201).json({
      message: "Supplier added successfully.",
      supplier: newSupplier,
    });
  } catch (err) {
    console.error("Error adding supplier:", err);
    res.status(500).json({ message: "Error adding supplier." });
  }
};

// Get all suppliers
const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json({ suppliers });
  } catch (err) {
    console.error("Error fetching suppliers:", err);
    res.status(500).json({ message: "Error fetching suppliers." });
  }
};

// Get a single supplier
const getSupplierById = async (req, res) => {
  try {
    const { supplier_id } = req.params;
    const supplier = await Supplier.findOne({ supplier_id });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    res.status(200).json({ supplier });
  } catch (err) {
    console.error("Error fetching supplier:", err);
    res.status(500).json({ message: "Error fetching supplier." });
  }
};

// Update a supplier
const updateSupplier = async (req, res) => {
  try {
    const { supplier_id } = req.params;
    const updatedData = req.body;

    const updatedSupplier = await Supplier.findOneAndUpdate(
      { supplier_id },
      updatedData,
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    res.status(200).json({
      message: "Supplier updated successfully.",
      supplier: updatedSupplier,
    });
  } catch (err) {
    console.error("Error updating supplier:", err);
    res.status(500).json({ message: "Error updating supplier." });
  }
};

module.exports = {
  addSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
};
