const mongoose = require("mongoose");

const smeSchema = new mongoose.Schema(
  {
    sme_id: {
      type: String,
      unique: true,
      trim: true,
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
      id_number: { type: String, required: true },
    },
    management_team: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
        id_number: { type: String, required: true },
      },
    ],
    bank_details: {
      account_number: { type: String, required: true },
      bank_name: { type: String, required: true },
      proof_of_banking: { type: String, required: true },
    },
    support_documents: {
      type: [
        {
          type: String,
          enum: [
            "Tax Certificate",
            "Company Registration",
            "Proof of Residence",
            "Bank Statement",
            "Contact Person ID",
            "Management Team IDs",
          ],
          required: true,
        },
      ],
      validate: {
        validator: function (docs) {
          const requiredDocs = [
            "Tax Certificate",
            "Company Registration",
            "Proof of Residence",
            "Bank Statement",
            "Contact Person ID",
            "Management Team IDs",
          ];
          return requiredDocs.every((doc) => docs.includes(doc));
        },
        message: "All required documents (Tax Certificate, Company Registration, Proof of Residence, Bank Statement, Contact Person ID, Management Team IDs) must be provided.",
      },
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("SME", smeSchema);