const CreditScore = require("../models/CreditScore");
const Transaction = require("../models/Transactions");

const assessCredit = async (req, res) => {
  try {
    const { sme_id, documents } = req.body; // Assume documents include revenue proof, etc.

    // Basic validation (we need to ensure required data is present)
    if (!sme_id || !documents) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // We assess initial credit limit based on the documents provided
    let initialScore = 300;
    if (documents.revenueProof) initialScore += 50;
    if (documents.taxReturns) initialScore += 50;
    if (documents.bankStatements) initialScore += 50;

    // Here we determine initial risk category and credit limit
    const riskCategory = 
      initialScore > 600 ? "Low" : initialScore >= 400 ? "Medium" : "High";
    const creditLimit =
      riskCategory === "Low" ? 20000 : riskCategory === "Medium" ? 10000 : 4000;

    // Save initial credit assessment to the database
    const newCreditScore = new CreditScore({
      sme_id,
      credit_score: initialScore,
      credit_limit: creditLimit,
      remaining_credit: creditLimit,
      risk_category: riskCategory,
      created_at: new Date(),
    });

    await newCreditScore.save();

    res.status(201).json({ 
      message: "Credit profile created successfully.",
      creditScore: newCreditScore
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error during credit assessment." });
  }
};

const updateCreditScore = async (req, res) => {
  try {
    const { sme_id, paymentStatus, amount } = req.body;

    // Retrieve user credit profile
    const creditProfile = await CreditScore.findOne({ sme_id });
    if (!creditProfile) {
      return res.status(404).json({ message: "Credit profile not found." });
    }

    let updatedScore = creditProfile.credit_score;

    // Logic for updating the credit score
    if (paymentStatus === "on_time") {
      updatedScore += 10; // Reward for timely payment
    } else if (paymentStatus === "late") {
      updatedScore -= 15; // Penalty for late payment
    } else if (paymentStatus === "default") {
      updatedScore -= 50; // Major penalty for defaulting
    }

    // Ensure credit score stays within valid bounds
    updatedScore = Math.min(Math.max(updatedScore, 300), 600);

    //Update risk category and credit limit dynamically
    const riskCategory =
      updatedScore > 600 ? "Low" : updatedScore > 400 ? "Medium" : "High";
    const creditLimit =
      riskCategory === "Low"
        ? 20000
        : riskCategory === "Medium"
        ? 10000
        : 4000;
    
    creditProfile.credit_score = updatedScore;
    creditProfile.credit_limit = creditLimit;
    creditProfile.risk_category = riskCategory;

    await creditProfile.save();

    res.status(200).json({ 
      message: "Credit score updated successfully.",
      creditScore: creditProfile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating credit score." });
  }
};


const getCreditScore = async (req, res) => {
  try {
    const { sme_id } = req.params;

    // Validate that sme_id is provided
    if (!sme_id) {
      return res.status(400).json({ message: "Missing SME ID." });
    }

    // Retrieve the credit profile from the database
    const creditProfile = await CreditScore.findOne({ sme_id });
    if (!creditProfile) {
      return res.status(404).json({ message: "Credit profile not found." });
    }

    res.status(200).json({
      message: "Credit profile retrieved successfully.",
      creditScore: creditProfile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving credit profile." });
  }
};


module.exports = { assessCredit, updateCreditScore, getCreditScore };