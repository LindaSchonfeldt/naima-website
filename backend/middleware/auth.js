import jwt from 'jsonwebtoken'

import Admin from '../models/Admin.js'
import Company from '../models/Company.js'
import Customer from '../models/Customer.js'

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret || !secret.trim()) {
    throw new Error('Missing JWT_SECRET env var')
  }
  return secret
}

export const authenticate = async (req, res, next) => {
  console.log('Authenticate middleware hit')
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try {
    const decoded = jwt.verify(token, getJwtSecret())
    console.log('Decoded JWT:', decoded)
    let user
    if (decoded.role === 'company') {
      user = await Company.findById(decoded.id)
      req.user = { id: user._id, role: user.role, companyId: user._id }
    } else if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id)
      req.user = { id: user._id, role: user.role }
    } else if (decoded.role === 'customer') {
      user = await Customer.findById(decoded.id)
      req.user = { id: user._id, role: user.role }
    }
    console.log('User found:', user)
    if (!user) return res.status(401).json({ error: 'User not found' })
    console.log('Decoded user in authenticate:', req.user)
    next()
  } catch (err) {
    console.error('Authenticate middleware unexpected error:', err)
    // Return 401 for JWT errors, not 500
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

export const authorize = (roles) => (req, res, next) => {
  console.log('User role in authorize:', req.user.role)
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
