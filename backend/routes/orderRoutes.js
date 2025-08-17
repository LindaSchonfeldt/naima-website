import express from 'express'

import { createOrder, getAllOrders } from '../controllers/orderController'

const router = express.Router()

// Create a new order
// This will also create a customer if they don't exist
router.post('/', createOrder)
router.get('/', getAllOrders) // Get all orders with customer details

export default router
