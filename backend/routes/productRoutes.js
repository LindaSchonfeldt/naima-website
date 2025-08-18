import express from 'express'

import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductsByCategory
} from '../controllers/productControllers.js'
import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

// Public routes (no auth)
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.get('/featured/list', getFeaturedProducts)
router.get('/category/:category', getProductsByCategory)

// Admin routes (require auth)
router.post('/', authenticate, authorize(['admin']), createProduct)
router.put('/:id', authenticate, authorize(['admin']), updateProduct)
router.delete('/:id', authenticate, authorize(['admin']), deleteProduct)

export default router
