import express from 'express'

import {
  createCustomer,
  deleteCustomerById,
  getAllCustomers,
  getCustomerById,
  getOrdersForCustomer,
  updateCustomerById
} from '../controllers/customerControllers.js'

const router = express.Router()

// Admin routes
router.get('/', getAllCustomers)
router.get('/:id', getCustomerById)
router.post('/', createCustomer)
router.put('/:id', updateCustomerById)
router.delete('/:id', deleteCustomerById)
router.get('/:id/orders', getOrdersForCustomer)

export default router
