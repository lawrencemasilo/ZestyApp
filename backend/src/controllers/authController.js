const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const sendEmail = require("../utils/nodemailer");
require('dotenv').config();

// User registration
const registerUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
    });
    await user.save();

    await sendEmail({
      from: 'Zesty <zesty@zestytechnologies.co.za>',
      to: user.email,
      subject: 'Welcome to Our Service',
      html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f9;
                margin: 0;
                padding: 0;
                color: #333;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #ddd;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                background-color: #005EFF;
                color: #ffffff;
                text-align: center;
                padding: 20px;
              }
              .email-header h1 {
                margin: 0;
                font-size: 24px;
              }
              .email-body {
                padding: 20px;
              }
              .email-body p {
                line-height: 1.6;
              }
              .email-footer {
                background-color: #f4f4f9;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #666;
              }
              .email-footer a {
                color: #005EFF;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="email-header">
                <h1>Welcome to Zesty!</h1>
              </div>
              <div class="email-body">
                <p>Hi <strong>${firstName}</strong>,</p>
                <p>Welcome to our platform! We're excited to have you on board.</p>
                <p>
                  Our goal is to provide you with the best tools and services to make your experience exceptional.
                  If you have any questions, feel free to reply to this email or contact our support team.
                </p>
                <p>Enjoy exploring our platform!</p>
                <p>Warm regards,<br>The Zesty Team</p>
              </div>
              <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} Zesty. All rights reserved.</p>
                <p>
                  <a href="https://zestytechnologies.co.za">Visit our website</a> |
                  <a href="mailto:support@zestytechnologies.co.za">Contact Support</a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user: ", err); // Log error to the console
    if (err.code === 11000) {
      return res.status(400).json({
        error: "Duplicate field value detected",
        details: err.keyValue,
      });
    }
    res.status(500).json({ error: "Server error" });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // CHeck if SECRET is defined in .env
    if (!process.env.SECRET) {
      console.errror("Secret is not  defined in environment variables");
      return res.status(500).json({ error: "Server error: Missing JWT secret" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error: ", err); // Log error to the console
    res.status(500).json({ error: "Server error" });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a random reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Generate a reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const emailContent = {
      to: email,
      subject: "Password Reset Instructions",
      text: `To reset your password, click on the following link: ${resetUrl}`,
      html: `<p>To reset your password, click on the following link:</p><p><a href="${resetUrl}">Reset Password</a></p>`,
    };

    const result = await sendEmail(emailContent);
    if (result.success) {
      res.status(200).json({ message: "Password reset instructions sent to your email" });
    } else {
      res.status(500).json({ error: "Failed to send email" });
    }
  } catch (err) {
    console.error("Error in forgot password:", err);
    res.status(500).json({ error: "Server error" });
  }
};


const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error("Error in reset password:", err);
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword };

