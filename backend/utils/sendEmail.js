const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Generic email sender
 * @param {string} to - recipient email
 * @param {string} subject - email subject
 * @param {string} text - plain text body
 */
async function sendEmail(to, subject, text) {
  await transporter.sendMail({
    from: `"CarGear Auth" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}

/**
 * Send OTP for user signup verification
 * @param {string} to - user email
 * @param {string} otp - generated OTP
 */
async function sendUserOTP(to, otp) {
  const subject = "Verify your account";
  const text = `Welcome to CarGear!\n\nYour OTP is: ${otp}\nIt will expire in 5 minutes.\n\nPlease enter this OTP in the app to verify your email.`;
  await sendEmail(to, subject, text);
}

/**
 * Send OTP for admin login/signup verification
 * @param {string} to - admin email
 * @param {string} otp - generated OTP
 */
async function sendAdminOTP(to, otp) {
  const subject = "Admin OTP Verification";
  const text = `Admin access attempt detected.\n\nYour OTP is: ${otp}\nIt will expire in 5 minutes.\n\nOnly authorized admins should use this code.`;
  await sendEmail(to, subject, text);
}

module.exports = { sendEmail, sendUserOTP, sendAdminOTP };
