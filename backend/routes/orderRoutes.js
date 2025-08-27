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
    const companyId = req.user.companyId || req.user.id
    try {
      const orders = await Order.find({ company: companyId }).populate(
        'customer'
      )
      orders.forEach((order) => {
        console.log(order.customer?.name)
      })
      console.log('Orders found:', orders)
      res.json(orders)
    } catch (error) {
      console.error('Error in /api/orders/company:', error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Admin routes
router.get('/', authenticate, authorize(['admin']), getAllOrders)

// Mixed routes (move param route last so it doesn't shadow static routes)
router.get(
  '/customer/:id',
  authenticate,
  authorize(['admin', 'company']),
  getOrdersForCustomer
)
router.get('/:id', authenticate, authorize(['admin', 'company']), getOrderById) // Allow admin and company

export default router
