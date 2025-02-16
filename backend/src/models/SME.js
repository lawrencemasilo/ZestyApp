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
      //proof_of_banking: { type: String, required: true },
    },
    documents: [
      {
        type: { type: String, required: true }, // Type of document (e.g. tax certificate)
        fileName: { type: String, required: true }, // Name of the file
        filePath: { type: String, required: true }, // Path to the file
        fileType: { type: String, required: true }, // MIME type of the file (e.g. uploads/document-123.pdf)
        uploadedAt: { type: Date, default: Date.now }, // Timestamp of when the file was uploaded
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SME", smeSchema);