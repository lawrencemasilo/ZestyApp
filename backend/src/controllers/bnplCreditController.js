const BnplCredit = require("../models/BnplCredit");
const CreditScore = require("../models/CreditScore");
const Repayments = require("../models/Repayments");
const Joi = require("joi");

// Validation schema for creating BNPL Credit
const createBnplCreditSchema = Joi.object({
  sme_id: Joi.string().required(),
  total_amount: Joi.number().min(1).required(),
  months_remaining: Joi.number().valid(3, 6, 12).required(),
});

// Create a BNPL Credit
const createBnplCredit = async (req, res) => {
    try {
      const { error } = createBnplCreditSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { sme_id, total_amount, months_remaining } = req.body;
  
      // Fetch SME's credit score
      const creditScore = await CreditScore.findOne({ sme_id });
      if (!creditScore || creditScore.credit_limit < total_amount) {
        return res.status(400).json({ message: "Insufficient credit limit." });
      }
  
      // Calculate monthly payment and interest
      const interestRate = months_remaining === 3 ? 12.5 : months_remaining === 6 ? 14.5 : 16.5;
      const monthlyPayment = (total_amount * (1 + interestRate / 100)) / months_remaining;
  
      const newBnplCredit = new BnplCredit({
        sme_id,
        total_amount,
        remaining_balance: total_amount,
        months_remaining,
        monthly_payment: monthlyPayment,
        interest_rate: interestRate,
        start_date: new Date(),
      });
  
      creditScore.credit_limit -= total_amount; //deduct total_amount from credit limit
      await newBnplCredit.save();

      // generate repayment records
      const repayments = [];
      for (let i = 1; i <= months_remaining; i++) {
        repayments.push({
          transaction_id: newBnplCredit._id,
          due_date: new Date(new Date().setMonth(new Date().getMonth() + i)), // due date incremented by i months
          amount_due: monthlyPayment,
          status: "pending",
        });
      }

      await Repayments.insertMany(repayments);
  
      res.status(201).json({ message: "BNPL credit application successful.", credit: newBnplCredit });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error applying for BNPL credit." });
    }
};

// Get Active BNPL Credits for SME
const getActiveBnplCredits = async (req, res) => {
  try {
    const { sme_id } = req.params;
    const { page = 1, limit = 10 } = req.query; // adding pagination

    const credits = await BnplCredit.find({ sme_id, status: "active" })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ credits, page, total: credits.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching active BNPL credits" });
  }
};

// Update BNPL Credit Status
const updateBnplCreditStatus = async (req, res) => {
  try {
    const { credit_id } = req.params;
    const { status } = req.body;

   // validate status input
   if (!["active", "paid", "defaulted"].includes(status)) {
    return res.status(400).json({ message: "Invalid status. Allowed values: active, paid, defaulted" });
   }

   // find the BNPL credir
   const credit = await BnplCredit.findOne({ credit_id });
   if (!credit) {
    return res.status(404).json({ message: "BNPL credit not found." });
   }

   // find and update BNPL credit
   const updateFields = { status };

   if (status === "paid") {
    updateFields.remaining_balance = 0;
    updateFields.months_remaining = 0;
   } else if (status === "defaulted") {
    const penaltyRate = 0.1; // 10% penalty rate
    updateFields.remaining_balance = credit.remaining_balance + credit.remaining_balance * penaltyRate;
    
    console.log(`Default logged for credit_id: ${credit_id}`);

    // update credit score
    const creditScore = await CreditScore.findOne({ sme_id: credit.sme_id });

    if (creditScore) {
      const scorePenalty = 50; // 50 points penalty for default
      creditScore.credit_score = Math.max(300, creditScore.credit_score - scorePenalty);
      await creditScore.save();
    }
   }

    // updates credit status in the DB
    const updatedCredit = await BnplCredit.findOneAndUpdate(
      { credit_id },
      updateFields,
      { new: true }
    );

    

    res.status(200).json({ message: "BNPL Credit status updated", credit: updatedCredit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating BNPL credit status" });
  }
};



module.exports = { createBnplCredit, getActiveBnplCredits, updateBnplCreditStatus };
