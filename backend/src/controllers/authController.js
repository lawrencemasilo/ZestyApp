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

    // Input validation
    if (!email || !password || !firstName || !lastName || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email }, 
        { phone }
      ] 
    });
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email 
          ? "Email already in use" 
          : "Phone number already registered" 
      });
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
      verified: false // Added to track user verification status
    });

    await user.save();

    try {
      await sendEmail({
        from: 'Zesty <zesty@zestytechnologies.co.za>',
        to: user.email,
        subject: 'Welcome to Our Service',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              /* Existing styles remain the same */
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
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Optional: You might want to handle email sending failure differently
      // For now, we'll still return a success response
    }

    res.status(201).json({ 
      message: "User registered successfully", 
      userId: user._id 
    });
  } catch (err) {
    console.error("Error registering user: ", err);
    
    // More specific error handling
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        error: "Validation failed", 
        details: errors 
      });
    }
    
    res.status(500).json({ 
      error: "Server error", 
      details: err.message 
    });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check if account is locked
    if (user.accountLocked && user.lockUntil > Date.now()) {
      return res.status(403).json({ 
        error: "Account is temporarily locked. Please try again later." 
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Increment login attempts
      user.loginAttempts += 1;
      
      // Lock account after 5 failed attempts
      if (user.loginAttempts >= 5) {
        user.accountLocked = true;
        user.lockUntil = new Date(Date.now() + 3600000); // 1 hour lock
      }
      
      await user.save();

      return res.status(400).json({ 
        error: "Invalid credentials",
        remainingAttempts: Math.max(0, 5 - user.loginAttempts)
      });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.accountLocked = false;
    user.lockUntil = undefined;
    await user.save();

    // Check if SECRET is defined in .env
    if (!process.env.SECRET) {
      console.error("Secret is not defined in environment variables");
      return res.status(500).json({ error: "Server error: Missing JWT secret" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        id: user._id,
        email: user.email 
      }, 
      process.env.SECRET, 
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ 
      token, 
      userId: user._id,
      email: user.email 
    });
  } catch (err) {
    console.error("Login error: ", err);
    res.status(500).json({ 
      error: "Server error", 
      details: err.message 
    });
  }
};

// Get user profile
/*const getUserProfile = async (req, res) => {
  try {
    // Ensure user is authenticated (this should be handled by protect middleware)
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      verified: user.verified
    });
  } catch (err) {
    console.error("Get profile error: ", err);
    res.status(500).json({ 
      error: "Server error", 
      details: err.message 
    });
  }
};*/

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

  // Input validation
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Deliberately vague response for security
      return res.status(200).json({ 
        message: "If an account exists, reset instructions will be sent" 
      });
    }

    // Generate a cryptographically secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Store hashed token and set expiration
    user.resetPasswordToken = hashedResetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Generate a reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const emailContent = {
      from: 'Zesty <zesty@zestytechnologies.co.za>',
      to: email,
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset</h1>
        <p>You have requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
      `
    };

    await sendEmail(emailContent);

    res.status(200).json({ 
      message: "Password reset instructions sent to your email" 
    });
  } catch (err) {
    console.error("Error in forgot password:", err);
    res.status(500).json({ 
      error: "Server error", 
      details: err.message 
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Input validation
  if (!token || !newPassword) {
    return res.status(400).json({ error: "Token and new password are required" });
  }

  try {
    // Hash the incoming token to compare with stored token
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Validate new password
    if (newPassword.length < 8) {
      return res.status(400).json({ 
        error: "Password must be at least 8 characters long" 
      });
    }

    // Hash the new password and save it
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = new Date(); // Track when password was last changed
    
    await user.save();

    res.status(200).json({ 
      message: "Password has been reset successfully" 
    });
  } catch (err) {
    console.error("Error in reset password:", err);
    res.status(500).json({ 
      error: "Server error", 
      details: err.message 
    });
  }
};


module.exports = { registerUser, loginUser, getUserProfile, forgotPassword, resetPassword };

