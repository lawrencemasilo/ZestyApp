const User = require("../models/User");
const sendEmail = require("../utils/nodemailer");

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Find user by ID and update with provided data
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true, 
      runValidators: true, 
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    
    if (updates.verified === true) {
      await sendEmail({
        to: user.email,
        subject: `You're Verified, ${user.firstName}!`,
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
              <h1>You're Verified, ${user.firstName}!</h1>
            </div>
            <div class="email-body">
              <p>Hi <strong>${user.firstName}</strong>,</p>
              <p>
                Congratulations! Your profile has been successfully verified on Zesty. Welcome to our network of forward-thinking SMEs redefining access to inventory financing and alternative credit solutions.
              </p>
              <ul>
                <li>Access Zesty's BNPL platform for seamless inventory restocking.</li>
                <li>Enjoy enhanced credit opportunities tailored to your needs.</li>
                <li>Leverage exclusive insights and support to optimize your operations.</li>
              </ul>
              <p>Warm regards,<br>The Zesty Team</p>
            </div>
            <div class="email-footer">
              <p>&copy; ${new Date().getFullYear()} Zesty. All rights reserved.</p>
              <p>
                <a href="https://zestytechnologies.co.za">Visit our website</a> |
                <a href="mailto:zesty@zestytechnologies.co.za">Contact Support</a>
              </p>
            </div>
          </div>
          </body>
          </html>
        `,
      });
    }

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateUser,
};
