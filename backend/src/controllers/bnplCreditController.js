const BnplCredit = require("../models/BnplCredit");
const CreditScore = require("../models/CreditScore");

// Create a BNPL Credit
const createBnplCredit = async (req, res) => {
    try {
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
  
      await newBnplCredit.save();
  
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
    const credits = await BnplCredit.find({ sme_id, status: "active" });

    res.status(200).json({ credits });
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

    const credit = await BnplCredit.findOneAndUpdate(
      { credit_id },
      { status },
      { new: true }
    );

    res.status(200).json({ message: "BNPL Credit status updated", credit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating BNPL credit status" });
  }
};



module.exports = { createBnplCredit, getActiveBnplCredits, updateBnplCreditStatus };
