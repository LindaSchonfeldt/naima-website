import express from 'express'

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
