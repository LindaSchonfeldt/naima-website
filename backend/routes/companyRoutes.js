import Company from '../models/Company.js'
import bcrypt from 'bcryptjs'
import express from 'express'
import jwt from 'jsonwebtoken'

const router = express.Router()

// Register a new company
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address, contactPerson } = req.body
    if (!password) {
      return res.status(400).json({ error: 'Password is required' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const company = new Company({
      name,
      email,
      password: hashedPassword,
      address,
      contactPerson
    })
    await company.save()
    res.status(201).json({ message: 'Company registered!' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Login a company
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const company = await Company.findOne({ email })
  if (!company) return res.status(401).json({ error: 'Invalid credentials' })

  const valid = await bcrypt.compare(password, company.password)
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
  res.json({ token, company: { name: company.name, email: company.email } })
})

export default router
