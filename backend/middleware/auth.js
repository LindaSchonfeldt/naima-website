import jwt from 'jsonwebtoken'

import Admin from '../models/Admin.js'
import Company from '../models/Company.js'
import Customer from '../models/Customer.js'

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    let user
    if (decoded.role === 'admin') {
      user = await Admin.findById(decoded.id)
    } else if (decoded.role === 'company') {
      user = await Company.findById(decoded.id)
    } else if (decoded.role === 'customer') {
      user = await Customer.findById(decoded.id)
    }
    if (!user) return res.status(401).json({ error: 'User not found' })
    req.user = { id: user._id, role: user.role, companyId: user.companyId }
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' })
    }
    res.status(401).json({ error: 'Invalid token' })
  }
}

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
