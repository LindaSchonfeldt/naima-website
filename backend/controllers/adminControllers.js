import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Admin from '../models/Admin.js'

// Register a new admin
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!password) {
      return res.status(400).json({ error: 'Password is required' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: 'admin' // Set role explicitly
    })
    await admin.save()
    res.status(201).json({ message: 'Admin registered!' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Login an admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body
  const admin = await Admin.findOne({ email })
  if (!admin) return res.status(401).json({ error: 'Invalid credentials' })

  const valid = await bcrypt.compare(password, admin.password)
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

  const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
  res.json({ token, admin: { name: admin.name, email: admin.email } })
}

// Get all admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find()
    res.json(admins)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get a single admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id)
    if (!admin) return res.status(404).json({ error: 'Admin not found' })
    res.json(admin)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update an admin's details
export const updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!admin) return res.status(404).json({ error: 'Admin not found' })
    res.json(admin)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete an admin
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id)
    if (!admin) return res.status(404).json({ error: 'Admin not found' })
    res.json({ message: 'Admin deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
