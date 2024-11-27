const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transaction_id: {
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
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier", // Reference the Supplier model (to be defined separately)
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    transaction_type: {
      type: String,
      enum: ["purchase", "repayment"], // Valid transaction types
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "pending", "failed"], // Valid statuses
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);