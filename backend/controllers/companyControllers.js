import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Company from '../models/Company.js'
import Customer from '../models/Customer.js'
import * as companyService from '../services/companyService.js'

export const registerCompany = async (req, res) => {
  try {
    const created = await companyService.createCompany(req.body)
    return res.status(201).json(created)
  } catch (err) {
    if (err.code === 'ALREADY_EXISTS')
      return res.status(409).json({ error: err.message })
    return res.status(400).json({ error: err.message })
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
