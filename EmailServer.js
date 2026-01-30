/* eslint-disable no-undef */
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import validator from "validator";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL]
    : ["http://localhost:5173", "http://127.0.0.1:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests, please try again later.",
});

app.use("/api/send-email", emailLimiter);

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: process.env.EMAIL_TLS === "true",
  },
});

app.post("/api/send-email", async (req, res) => {
  const { name, phone, email, message, countryName, userReferenceId } =
    req.body;

  if (userReferenceId) {
    return res.status(200).send("Message sent successfully!");
  }

  if (!name || name.length < 2) {
    return res.status(400).send("Invalid name");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Invalid email");
  }

  if (!message || message.length < 10) {
    return res.status(400).send("Message too short");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `Nuevo mensaje de ${name}`,
    html: `
      <h3 style="color: #2c3e50; font-family: Arial;">
        Detalles del mensaje
      </h3>

      <p style="font-family: Arial; font-size: 14px;">
        <strong>Nombre:</strong> ${name}<br>
        <strong>Teléfono:</strong> ${phone || "No proporcionado"} 
        >------[ ${countryName || "N/A"} ]<br>
        <strong>Correo:</strong> ${email}
      </p>

      <p style="font-family: Arial; font-size: 14px;">
        <strong>Mensaje:</strong><br>
        <em>${message}</em>
      </p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully!");
  } catch (error) {
    console.error("Error sending the message:", error);
    res.status(500).send("Error sending the message");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
