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

// Mixed routes
router.get('/:id', authenticate, authorize(['admin', 'company']), getOrderById) // Allow admin and company

// Company routes
router.post('/', authenticate, authorize(['company']), createOrder)
router.get(
  '/company',
  authenticate,
  authorize(['company']),
  async (req, res) => {
    console.log('--- /api/orders/company route hit ---')
    console.log('User object:', req.user)
    const companyId = req.user.companyId || req.user.id
    console.log('Resolved companyId:', companyId)
    try {
      const orders = await Order.find({ company: companyId }).populate(
        'customer'
      )
      console.log('Orders found:', orders)
      res.json(orders)
    } catch (error) {
      console.error('Error in /api/orders/company:', error)
      res.status(500).json({ error: error.message })
    }
  }
)

// Admin routes
router.get('/', authenticate, authorize(['admin']), getAllOrders) // Get all orders with customer details
router.get(
  '/customer/:id',
  authenticate,
  authorize(['admin', 'company']),
  getOrdersForCustomer
) // Get orders for a specific customer

export default router
