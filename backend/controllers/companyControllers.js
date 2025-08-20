import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Company from '../models/Company.js'
import Customer from '../models/Customer.js'

// Register a new company
export const registerCompany = async (req, res) => {
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
      contactPerson,
      role: 'company' // Set role explicitly
    })
    await company.save()

    // Create linked customer profile
    const customer = new Customer({
      name,
      email,
      address,
      phone: req.body.phone,
      company: company._id // Link to company
    })
    await customer.save()

    res.status(201).json({ message: 'Company registered!', company, customer })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Login a company
export const loginCompany = async (req, res) => {
  try {
    const { email, password } = req.body
    const company = await Company.findOne({ email, role: 'company' })
    if (!company) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, company.password)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign(
      { id: company._id, role: 'company', companyId: company._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )
    const customer = await Customer.findOne({ company: company._id })
    res.json({ token, company, customer })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Logout a company
export const logoutCompany = (req, res) => {
  // Invalidate the token on the client side
  res.json({ message: 'Logged out successfully' })
}

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find()
    res.json(companies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id)
    if (!company) return res.status(404).json({ error: 'Company not found' })
    res.json(company)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update a company's details
export const updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!company) return res.status(404).json({ error: 'Company not found' })
    res.json(company)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete a company
export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id)
    if (!company) return res.status(404).json({ error: 'Company not found' })
    res.json({ message: 'Company deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
