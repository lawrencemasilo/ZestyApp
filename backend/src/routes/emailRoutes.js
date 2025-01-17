const express = require('express');
const sendEmail = require('../utils/nodemailer');

const router = express.Router();

router.post('/send-email', async (req, res) => {
  const { to, subject, text, html } = req.body; // Get data from frontend

  // Validate required fields
  if (!to || !subject || !text || !html) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Use the utility function to send an email
  const emailResult = await sendEmail({ to, subject, text, html });

  // Respond to the frontend
  if (emailResult.success) {
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } else {
    return res.status(500).json({ success: false, message: 'Failed to send email', error: emailResult.error });
  }
});

module.exports = router;
