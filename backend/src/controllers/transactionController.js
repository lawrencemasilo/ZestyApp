const Transaction = require("../models/Transactions");
const Repayment = require("../models/Repayments");
const CreditScore = require("../models/CreditScore");
const BnplCredit = require("../models/BnplCredit");
const Supplier = require("../models/Suppliers");

const createTransaction = async (req, res) => {
  try {
    const { sme_id, supplier_id, amount, transaction_type, bnpl_credit_id } =
      req.body;

    // Validate supplier
    const supplier = await Supplier.findOne({ supplier_id });
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    // Handle purchase transactions
    if (transaction_type === "purchase") {
      const creditScore = await CreditScore.findOne({ sme_id });
      if (!creditScore || creditScore.credit_limit < amount) {
        return res.status(400).json({ message: "Insufficient credit limit" });
      }

      const transaction = new Transaction({
        sme_id,
        supplier_id: supplier._id,
        amount,
        transaction_type,
        status: "pending",
      });
      await transaction.save();

      const repayment = new Repayment({
        transaction_id: transaction._id,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        amount_due: amount,
        status: "pending",
      });
      await repayment.save();

      creditScore.credit_limit -= amount;
      await creditScore.save();

      return res
        .status(201)
        .json({ message: "Purchase transaction created", transaction });
    }

    // Handle repayment transactions
    if (transaction_type === "repayment") {
      if (!bnpl_credit_id) {
        return res.status(400).json({
          message: "BNPL credit ID is required for repayment",
        });
      }

      const bnplCredit = await BnplCredit.findById(bnpl_credit_id);
      if (!bnplCredit) {
        return res.status(404).json({ message: "BNPL credit not found" });
      }

      if (amount > bnplCredit.remaining_balance) {
        return res
          .status(400)
          .json({ message: "Repayment amount exceeds remaining balance" });
      }

      const transaction = new Transaction({
        sme_id,
        amount,
        transaction_type,
        status: "completed",
      });
      await transaction.save();

      bnplCredit.remaining_balance -= amount;
      if (bnplCredit.remaining_balance <= 0) {
        bnplCredit.status = "paid";
      }
      await bnplCredit.save();

      return res
        .status(201)
        .json({ message: "Repayment transaction created", transaction });
    }

    return res.status(400).json({ message: "Invalid transaction type" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all transactions for an SME
const getTransactions = async (req, res) => {
  try {
    const { sme_id } = req.params;

    // Fetch all transactions for the SME
    const transactions = await Transaction.find({ sme_id }).sort({ createdAt: -1 });

    res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

// Fetch all repayments for an SME
const getRepayments = async (req, res) => {
  try {
    const { sme_id } = req.params;

    // Fetch all repayments associated with the SME
    const repayments = await Repayment.find({ sme_id })
      .populate("transaction_id") // Populate transaction details
      .sort({ due_date: 1 });

    res.status(200).json({ repayments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching repayments" });
  }
};

module.exports = { createTransaction, getTransactions, getRepayments };
