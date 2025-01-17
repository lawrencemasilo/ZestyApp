const mongoose = require("mongoose");
const Repayments = require("../models/Repayments");
const BnplCredit = require("../models/BnplCredit");

// process a repayment
const processRepayment = async (req, res) => {
    const session = await mongoose.startSession(); // begin a transaction
    session.startTransaction();
    try {
        const { repayment_id } = req.params;
        const { amount_paid } = req.body;

        if (!amount_paid || amount_paid <= 0) {
          return res.status(400).json({ message: "Amount paid must be greater than zero." });
        }
    
        const repayment = await Repayments.findOne({ repayment_id }).session(session);
        if (!repayment) {
          return res.status(404).json({ message: "Repayment record not found" });
        }
    
        if (repayment.status === "paid") {
          return res.status(400).json({ message: "Repayment already marked as paid" });
        }
    
        repayment.amount_paid += amount_paid;
    
        // Check if the repayment is fully paid
        if (repayment.amount_paid >= repayment.amount_due) {
          repayment.status = "paid";
          repayment.amount_paid = repayment.amount_due; // cap amount_paid to amount_due
        } else {
          repayment.status = "pending"; // keep status as pending if partially paid
        }
    
        await repayment.save();
    
        // Update the BNPL credit
        const bnplCredit = await BnplCredit.findById(repayment.transaction_id).session(session);
        if (bnplCredit) {
          bnplCredit.remaining_balance -= amount_paid;
          if (bnplCredit.remaining_balance <= 0) {
            bnplCredit.status = "paid";
            bnplCredit.remaining_balance = 0;
            bnplCredit.months_remaining = 0;
          } else if (repayment.status === "paid") {
            bnplCredit.months_remaining -= 1;
          }
          await bnplCredit.save();
        }
        await session.commitTransaction(); // commit transaction
        res.status(200).json({
          message: "Repayment processed successfully",
          repayment,
          remaining_balance: bnplCredit.remaining_balance,
          next_due_date: bnplCredit.months_remaining > 0 ? repayment.due_date : null,
        });
      } catch (err) {
        await session.abortTransaction(); // rollback transaction
        console.error(err);
        res.status(500).json({ message: "Error processing repayment" });
      } finally {
        session.endSession();
      }
};

// fetch repayments for a specific BNPL credit
const getRepaymentsByCredit = async (req, res) => {
    try {
        const { credit_id } = req.params;
        const { page = 1, limit = 10 } = req.query;
    
        const repayments = await Repayments.find({ transaction_id: credit_id }).sort({ due_date: "asc" })
          .skip((page - 1) * limit)
          .limit(Number(limit));
        
        if (!repayments || repayments.length === 0) {
          return res.status(404).json({ message: "No repayments yet" });
        }

        //calculate total outstanding amount for all pending/overdue repayments
        const totalOutstanding = await Repayments.aggregate([
          { $match: { transaction_id: credit_id, status: { $in: ["pending", "overdue"] } } },
          { $group: { _id: null, total: { $sum: "$amount_due" } } }
        ]);
        
        res.status(200).json({
          repayments,
          page,
          total: repayments.length,
          totalOutstanding: totalOutstanding[0]?.total || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching repayments" });
    }
};

module.exports = { processRepayment, getRepaymentsByCredit };