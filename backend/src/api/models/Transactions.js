const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transaction_id: {
      type: String,
      unique: true,
      trim: true,
    },
    sme_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SME",
      required: true,
    },
    supplier_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ["purchase", "repayment"],
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"],
      required: true,
    },
  },
  { timestamps: true }
);

transactionSchema.pre("save", async function (next) {
  if (!this.transaction_id) {
    this.transaction_id = `TXN-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
  }
  next();
});

module.exports = mongoose.model("Transaction", transactionSchema);