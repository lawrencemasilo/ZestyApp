const mongoose = require("mongoose");

const repaymentSchema = new mongoose.Schema(
  {
    repayment_id: {
      type: String,
      unique: true,
      trim: true,
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
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
      default: 0,
    },
    status: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      required: true,
    },
  },
  { timestamps: true }
);

repaymentSchema.pre("save", async function (next) {
  if (!this.repayment_id) {
    this.repayment_id = `REPAY-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model("Repayment", repaymentSchema);