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
    remaining_balance: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["paid", "pending", "overdue"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

// virtual field to calculate overdue status
repaymentSchema.virtual("is_overdue").get(function () {
  return this.status === "pending" && new Date() > this.due_date;
});

// hook to ensure repayment_id is generated and remaining_balance is accurate
repaymentSchema.pre("save", function (next) {
  if (!this.repayment_id) {
    this.repayment_id = `REPAY-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }
  this.remaining_balance = Math.max(0, this.amount_due - this.amount_paid);
  if (this.remaining_balance === 0) {
    this.status = "paid";
  }
  next();
});

// index for faster queries
repaymentSchema.index({ transaction_id: 1 });

module.exports = mongoose.model("Repayment", repaymentSchema);