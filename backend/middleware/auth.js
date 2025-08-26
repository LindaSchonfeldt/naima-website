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
  try {
    console.log('Authorization header:', req.headers.authorization) // <-- debug

    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      console.log('No token provided')
      return res.status(401).json({ error: 'No token provided' })
    }

    let decoded
    try {
      decoded = jwt.verify(token, getJwtSecret())
      console.log('Decoded JWT:', decoded) // <-- debug
    } catch (err) {
      console.error('JWT verify error:', err.name, err.message) // <-- debug
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' })
      }
      return res.status(401).json({ error: 'Invalid token' })
    }

    // user lookup
    let user
    if (decoded.role === 'admin') user = await Admin.findById(decoded.id)
    else if (decoded.role === 'company')
      user = await Company.findById(decoded.id)
    else if (decoded.role === 'customer')
      user = await Customer.findById(decoded.id)

    console.log(
      'User found:',
      !!user,
      user ? { _id: user._id, role: user.role } : null
    ) // <-- debug

    if (!user) return res.status(401).json({ error: 'User not found' })

    req.user = { id: user._id, role: user.role, companyId: user.companyId }
    next()
  } catch (err) {
    console.error('Authenticate middleware unexpected error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
