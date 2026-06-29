const nodemailer = require('nodemailer');
require('dotenv').config();

async function sendEmail(to, subject, htmlContent) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"DocMeet" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  });
}

module.exports = sendEmail;
