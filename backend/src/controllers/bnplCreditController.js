const BnplCredit = require("../models/BnplCredit");
const CreditScore = require("../models/CreditScore");
const Repayments = require("../models/Repayments");
const Joi = require("joi");
const nodemailer = require("../utils/nodemailer");

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
    if (!creditScore || creditScore.remaining_credit < total_amount) {
      return res.status(400).json({ message: "Insufficient credit limit." });
    }

    // Calculate monthly payment and interest
    const interestRate = months_remaining === 3 ? 3 : months_remaining === 6 ? 6 : 9;
    const monthlyPayment = (total_amount * (1 + interestRate / 100)) / months_remaining;

    const newBnplCredit = new BnplCredit({
      sme_id,
      total_amount,
      remaining_balance: creditScore.credit_limit - total_amount,
      months_remaining,
      monthly_payment: monthlyPayment,
      interest_rate: interestRate,
      start_date: new Date(),
    });

    creditScore.remaining_credit -= total_amount; // Deduct total_amount from credit limit
    await newBnplCredit.save();
    await creditScore.save();

    // Generate repayment records
    /*const repayments = [];
    for (let i = 1; i <= months_remaining; i++) {
      repayments.push({
        transaction_id: newBnplCredit._id,
        due_date: new Date(new Date().setMonth(new Date().getMonth() + i)), // Due date incremented by i months
        amount_due: monthlyPayment,
      });
    }
    await Repayments.insertMany(repayments);*/

    // Generate secure PIN for checkout
    const securePin = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit PIN

    // Send email notification to the user
    /*const emailSubject = "Your BNPL Credit Has Been Approved!";
    const emailText = `
      Congratulations! Your BNPL credit has been successfully created. 

      Here are the details:
      - Total Amount: ${total_amount.toFixed(2)}
      - Monthly Payment: ${monthlyPayment.toFixed(2)}
      - Duration: ${months_remaining} months
      - Interest Rate: ${interestRate}%

      How to Use:
      1. Visit one of our partnered suppliers.
      2. At checkout, provide your SME ID (${sme_id}) and use the secure PIN: ${securePin}.
      3. Enjoy hassle-free purchases!

      For questions or support, contact us.

      Thank you for choosing our BNPL service!
          `;
          const emailHtml = `
            <h3>Congratulations! Your BNPL credit has been approved.</h3>
            <p><strong>Details:</strong></p>
            <ul>
              <li><strong>Total Amount:</strong> ${total_amount.toFixed(2)}</li>
              <li><strong>Monthly Payment:</strong> ${monthlyPayment.toFixed(2)}</li>
              <li><strong>Duration:</strong> ${months_remaining} months</li>
              <li><strong>Interest Rate:</strong> ${interestRate}%</li>
            </ul>
            <p><strong>How to Use:</strong></p>
            <ol>
              <li>Visit one of our partnered suppliers.</li>
              <li>At checkout, provide your SME ID (<strong>${sme_id}</strong>) and use the secure PIN: <strong>${securePin}</strong>.</li>
              <li>Enjoy hassle-free purchases!</li>
            </ol>
            <p>If you have any questions, feel free to contact us.</p>
            <p>Thank you for choosing our BNPL service!</p>
    `;

    await sendEmail({
      from: '"Zesty" <no-reply@zestytechnologies.com>',
      to: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });*/

    return res.status(201).json({ message: "BNPL credit created successfully. Email sent to the user." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to create BNPL credit.", error: err.message });
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
