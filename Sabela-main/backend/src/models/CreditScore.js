const mongoose = require("mongoose");

const creditScoreSchema = new mongoose.Schema(
  {
    credit_score_id: {
      type: String,
      unique: true,
      trim: true,
    },
    sme_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SME",
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
      enum: ["Low", "Medium", "High"],
      required: true,
    },
  },
  { timestamps: true }
);

creditScoreSchema.pre("save", async function (next) {
  if (!this.credit_score_id) {
    this.credit_score_id = `CS-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model("CreditScore", creditScoreSchema);