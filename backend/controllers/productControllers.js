import Product from '../models/Product.js'

export const getAllProducts = async (req, res) => {
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
}

// Get single product by ID
export const getProductById = async (req, res) => {
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
}

// Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findFeatured()
    res.json(products)
  } catch (error) {
    console.error('Error fetching featured products:', error)
    res.status(500).json({ message: 'Failed to fetch featured products' })
  }
}

// Get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params
    const products = await Product.findByCategory(category)
    res.json(products)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    res.status(500).json({ message: 'Failed to fetch products by category' })
  }
}

// Admin routes
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    res
      .status(400)
      .json({ message: 'Failed to create product', error: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    res
      .status(400)
      .json({ message: 'Failed to update product', error: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted' })
  } catch (error) {
    console.error('Error deleting product:', error)
    res
      .status(500)
      .json({ message: 'Failed to delete product', error: error.message })
  }
}
