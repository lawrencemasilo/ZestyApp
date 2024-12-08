const mongoose = require("mongoose");

const bnplCreditSchema = new mongoose.Schema(
  {
    credit_id: {
      type: String,
      unique: true,
      trim: true,
    },
    sme_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SME",
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    remaining_balance: {
      type: Number,
      required: true,
    },
    months_remaining: {
      type: Number,
      required: true,
    },
    monthly_payment: {
      type: Number,
      required: true,
    },
    interest_rate: {
      type: Number,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "paid", "defaulted"],
      default: "active",
    },
  },
  { timestamps: true }
);

// Generate a unique credit ID before saving
bnplCreditSchema.pre("save", function (next) {
  if (!this.credit_id) {
    this.credit_id = `BNPL-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model("BnplCredit", bnplCreditSchema);
