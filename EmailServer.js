/* eslint-disable no-undef */
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'https://franciscoaverruz.netlify.app, http://localhost:5173/',
  methods: 'POST',
  allowedHeaders: 'Content-Type'
}));

app.use(express.json());

app.post("/api/send-email", async (req, res) => {
  const { name, phone, email, message, countryName } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail', 
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === "production",
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Nuevo mensaje de ${name}`,
    html: `
      <h3 style="color: #2c3e50; font-family: Arial, sans-serif;">Detalles del mensaje</h3>
      <p style="font-family: Arial, sans-serif; font-size: 14px;">
        <strong>Teléfono:</strong> ${phone} >------[ ${countryName} ]<br>
        <strong>Correo:</strong> ${email}<br>
      </p>
      <p style="font-family: Arial, sans-serif; font-size: 14px;">
        <strong>Mensaje:</strong><br><em>${message}</em>
      </p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("message sent successfully!");
  } catch (error) {
    console.error("Error sending the message:", error);
    res.status(500).send("Error sending the message");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
