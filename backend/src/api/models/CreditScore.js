const mongoose = require("mongoose");

const creditScoreSchema = new mongoose.Schema(
  {
    credit_score_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    sme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SME", // Reference the SME model
      required: true,
    },
    credit_score: {
      type: Number,
      required: true,
    },
    credit_limit: {
      type: Number,
      required: true,
    },
    risk_category: {
      type: String,
      enum: ["Low", "Medium", "High"], // Define valid categories
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CreditScore", creditScoreSchema);