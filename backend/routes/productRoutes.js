import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, featured, status = 'active', search } = req.query

    let filter = { status }

    // Add category filter
    if (category) filter.category = category

    // Add featured filter
    if (featured === 'true') filter.featured = true

    let query = Product.find(filter)

    // Add text search if provided
    if (search) {
      query = Product.searchProducts(search, status)
    } else {
      query = query.sort({ createdAt: -1 })
    }

    const products = await query
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ message: 'Failed to fetch products' })
  }
})

// Get single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ message: 'Failed to fetch product' })
  }
})

// Get featured products
router.get('/featured/list', async (req, res) => {
  try {
    const products = await Product.findFeatured()
    res.json(products)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    res.status(500).json({ message: 'Failed to fetch featured products' })
  }
})

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params
    const products = await Product.findByCategory(category)
    res.json(products)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    res.status(500).json({ message: 'Failed to fetch products by category' })
  }
})

export default router
