const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    supplier_id: {
      type: String,
      unique: true,
      trim: true,
    },
    business_name: {
      type: String,
      required: true,
      trim: true,
    },
    contact_email: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v); 
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    api_key: {
      type: String,
      required: true,
      unique: true, 
      trim: true,
    },
    bank_details: {
      account_number: { type: String, required: true },
      bank_name: { type: String, required: true },
      proof_of_banking: { type: String, required: true },
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate a unique supplier_id
supplierSchema.pre("save", async function (next) {
  if (!this.supplier_id) {
    // Generate unique ID (e.g., SUP-XXXXXX)
    this.supplier_id = `SUP-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model("Supplier", supplierSchema);