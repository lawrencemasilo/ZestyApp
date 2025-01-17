const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // SMTP server address
  port: process.env.SMTP_PORT, // SMTP port (secure connection)
  secure: true, // Use SSL (true for port 465)
  auth: {
    user: process.env.SMTP_USER, // Your email username
    pass: process.env.SMTP_PASS, // Your email password
  },
});

/*
const mailOptions = {
  from: '"Your Company" <zesty@zestytechnologies.co.za>', // Sender address
  to: 'user@example.com', // List of recipients
  subject: 'Welcome to Our Service', // Email subject
  text: 'Hello! Thank you for registering.', // Plain text body
  html: '<b>Hello!</b> Thank you for registering.', // HTML body
};
*/

const sendEmail = async ({ to, subject, text, html }) => {
  const mailOptions = {
    from: '"Zesty" <zesty@zestytechnologies.co.za>', // Sender address
    to, // Recipient address (dynamic)
    subject, // Subject line
    text, // Plain text body
    html, // HTML body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
    return { success: true, message: `Email sent to ${to}` };
  } catch (err) {
    console.error('Error sending email:', err);
    return { success: false, message: 'Failed to send email', error: err };
  }
};

module.exports = sendEmail;
