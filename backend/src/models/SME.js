const mongoose = require("mongoose");

const smeSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    business_name: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: String,
      required: true,
      trim: true,
    },
    registration_number: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tax_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    monthly_revenue: {
      type: Number,
      required: true,
    },
    address: {
      physical: { type: String, required: true },
      operational: { type: String, required: true },
    },
    contact_person: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    bank_details: {
      account_number: { type: String, required: true },
      bank_name: { type: String, required: true },
    },
    documents: {
      revenue_proof: {
        type: String,
        required: true
      },
      tax_returns: {
        type: String,
        required: true
      },
      bank_statements: {
        type: String,
        required: true
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("SME", smeSchema);