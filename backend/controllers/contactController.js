import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Set up the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service you use
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASS, // your email password or App Password
  },
});

// Controller function to handle sending the email
export const sendEmail = (req, res) => {
  const { name, email, message } = req.body;

  // Validate the incoming data (you can add more validations as needed)
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // the email to send to
    subject: `New message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent successfully' });
  });
};
