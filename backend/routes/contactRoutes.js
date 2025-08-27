import express from 'express'
import rateLimit from 'express-rate-limit'

import { submitContactForm, validateContact } from '../controllers/contactController.js'

export const router = express.Router()

// 🛡️ basic rate limit for spam bursts
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
})

router.post('/', limiter, validateContact, submitContactForm)

export default router
