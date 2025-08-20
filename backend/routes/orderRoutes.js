import express from 'express'
import Order from '../models/Order.js'

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersForCustomer
} from '../controllers/orderController.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Company routes
router.post('/', authenticate, authorize(['company']), createOrder)
router.get(
  '/company',
  authenticate,
  authorize(['company']),
  async (req, res) => {
    try {
      const companyId = req.user.companyId || req.user._id
      const orders = await Order.find({ company: companyId }).populate(
        'customer'
      )
      res.json(orders)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
)

// Admin routes
router.get('/', authenticate, authorize(['admin']), getAllOrders) // Get all orders with customer details
router.get('/:id', authenticate, authorize(['admin']), getOrderById) // Get order by ID with customer details
router.get(
  '/customer/:id',
  authenticate,
  authorize(['admin', 'company']),
  getOrdersForCustomer
) // Get orders for a specific customer

export default router
