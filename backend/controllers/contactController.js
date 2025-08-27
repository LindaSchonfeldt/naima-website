import { body, validationResult } from "express-validator";

import contactMessage from "../models/contactMessage.js";

// validation + sanitization (keep phone optional)
export const validateContact = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 80 })
    .withMessage("Name must be 2–80 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Enter a valid email")
    .normalizeEmail(),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 7, max: 20 })
    .withMessage("Phone must be 7–20 characters")
    .matches(/^[+()\d\s-]+$/)
    .withMessage("Phone can contain digits, spaces, (), +, -"),
  body("subject")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 120 })
    .withMessage("Subject max 120 characters"),
  body("message")
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be 10–2000 characters"),
  // 🛡️ simple honeypot – should be empty
  body("botField")
    .custom((v) => v === "")
    .withMessage("Spam detected"),
];

// controller 
export const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ error: "Validation failed", details: errors.array() });
  }

  const { name, email, phone, subject, message } = req.body;

  try {
    const newMessage = await contactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date(),
    });
    res.status(201).json({
      message: "Your message has been sent successfully.",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res
      .status(500)
      .json({
        error: "Failed to submit the contact form. Please try again later.",
      });
  }
};
