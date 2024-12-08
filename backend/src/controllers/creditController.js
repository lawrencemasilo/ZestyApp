const CreditScore = require("../models/CreditScore");
const Transaction = require("../models/Transactions");

const assessCredit = async (req, res) => {
  try {
    const { sme_id, documents } = req.body; // Assume documents include revenue proof, etc.

    // Mock logic for credit assessment
    const creditScore = Math.floor(Math.random() * (850 - 300 + 1) + 300); // Random score
    const riskCategory = creditScore > 700 ? "Low" : creditScore > 500 ? "Medium" : "High";
    const creditLimit = riskCategory === "Low" ? 50000 : riskCategory === "Medium" ? 30000 : 10000;

    // Save credit assessment
    const newCreditScore = new CreditScore({
      sme_id,
      credit_score: creditScore,
      credit_limit: creditLimit,
      risk_category: riskCategory,
    });

    await newCreditScore.save();

    res.status(201).json({ message: "Credit assessment completed.", creditScore: newCreditScore });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during credit assessment." });
  }
};


module.exports = { assessCredit };