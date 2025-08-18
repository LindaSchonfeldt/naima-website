import express from 'express'

import {
  createCustomer,
  deleteCustomerById,
  getAllCustomers,
  getCustomerById,
  updateCustomerById
} from '../controllers/customerControllers.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Admin routes
router.get('/', authenticate, authorize(['admin']), getAllCustomers)
router.get('/:id', authenticate, authorize(['admin']), getCustomerById)
router.post('/', authenticate, authorize(['admin']), createCustomer)
router.put(
  '/:id',
  authenticate,
  authorize(['admin', 'company']),
  updateCustomerById
)
router.delete('/:id', authenticate, authorize(['admin']), deleteCustomerById)

export default router
