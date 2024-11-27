const mongoose = require("mongoose");

const SMESchema = new mongoose.Schema(
  {
    sme_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User model
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
      physical: {
        type: String,
        required: true,
        trim: true,
      },
      operational: {
        type: String,
        required: true,
        trim: true,
      },
    },
    contact_person: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
      },
    },
    bank_details: {
      account_number: {
        type: String,
        required: true,
        trim: true,
      },
      bank_name: {
        type: String,
        required: true,
        trim: true,
      },
      proof_of_banking: {
        type: String,
        required: true, // Assumes path to the uploaded file
        trim: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SME", SMESchema);