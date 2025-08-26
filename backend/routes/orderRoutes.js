import express from 'express'

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersForCustomer
} from '../controllers/orderController.js'
import { authenticate, authorize } from '../middleware/auth.js'
import Order from '../models/Order.js'

const router = express.Router()

// Company routes
router.post('/', authenticate, authorize(['company']), createOrder)

router.get(
  '/company',
  authenticate,
  authorize(['company']),
  async (req, res) => {
    try {
      console.log('GET /api/orders/company - req.user:', req.user)
      const companyId = req.user.companyId || req.user.id
      const orders = await Order.find({ company: companyId })
        .populate('customer')
        .lean()
      return res.json(orders)
    } catch (err) {
      console.error('Error in GET /api/orders/company:', err.stack || err)
      return res
        .status(500)
        .json({ error: 'Server error fetching company orders' })
    }
  }
)

// Admin routes
router.get('/', authenticate, authorize(['admin']), getAllOrders)
router.get(
  '/customer/:id',
  authenticate,
  authorize(['admin', 'company']),
  getOrdersForCustomer
)

// Mixed routes (move param route last so it doesn't shadow static routes)
router.get('/:id', authenticate, authorize(['admin', 'company']), getOrderById) // Allow admin and company

export default router
