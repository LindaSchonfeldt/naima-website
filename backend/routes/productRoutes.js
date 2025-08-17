import express from 'express'

import {
  getAllProducts,
  getFeaturedProducts,
  getProductById,
  getProductsByCategory
} from '../controllers/productControllers.js'

const router = express.Router()

// Admin routes
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.get('/featured/list', getFeaturedProducts)
router.get('/category/:category', getProductsByCategory)

export default router
