const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema(
  {
    repayment_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction", // Reference the Transaction model
      required: true,
    },
    due_date: {
      type: Date,
      required: true,
    },
    amount_due: {
      type: Number,
      required: true,
    },
    amount_paid: {
      type: Number,
      default: 0, // Default to 0 if no payment has been made yet
    },
    status: {
      type: String,
      enum: ["paid", "pending", "overdue"], // Valid statuses
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repayment", repaymentSchema);