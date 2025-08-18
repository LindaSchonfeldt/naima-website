import express from 'express'

import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersForCustomer
} from '../controllers/orderController.js'

const router = express.Router()

// Company routes
router.post('/', createOrder)

// Admin routes
router.get('/', getAllOrders) // Get all orders with customer details
router.get('/:id', getOrderById) // Get order by ID with customer details
router.get('/customer/:id', getOrdersForCustomer) // Get orders for a specific customer

export default router
