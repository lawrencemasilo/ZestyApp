const Repayments = require("../models/Repayments");
const BnplCredit = require("../models/BnplCredit");

// process a repayment
const processRepayment = async (req, res) => {
    try {
        const { repayment_id } = req.params;
        const { amount_paid } = req.body;
    
        const repayment = await Repayments.findOne({ repayment_id });
        if (!repayment) {
          return res.status(404).json({ message: "Repayment record not found" });
        }
    
        if (repayment.status === "paid") {
          return res.status(400).json({ message: "Repayment already paid" });
        }
    
        repayment.amount_paid += amount_paid;
    
        // Check if the repayment is fully paid
        if (repayment.amount_paid >= repayment.amount_due) {
          repayment.status = "paid";
        }
    
        await repayment.save();
    
        // Update the BNPL credit
        const bnplCredit = await BnplCredit.findById(repayment.transaction_id);
        if (bnplCredit) {
          bnplCredit.remaining_balance -= amount_paid;
          if (bnplCredit.remaining_balance <= 0) {
            bnplCredit.status = "paid";
            bnplCredit.months_remaining = 0;
          } else {
            bnplCredit.months_remaining -= 1;
          }
          await bnplCredit.save();
        }
    
        res.status(200).json({ message: "Repayment processed successfully", repayment });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error processing repayment" });
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
          return res.status(404).json({ message: "No repayments found for this credit" });
        }
        
        res.status(200).json({ repayments, page, total: repayments.length });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching repayments" });
    }
};

module.exports = { processRepayment, getRepaymentsByCredit };