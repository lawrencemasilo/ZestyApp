import axiosInstance from '../api/axios';

const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const response = await axiosInstance.post('/email/send-email', {
      to,
      subject,
      text,
      html,
    });

    if (response.data.success) {
      console.log('Email sent successfully:', response.data.message);
      return response.data.message;
    } else {
      console.error('Failed to send email:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
};

export default sendEmail;
