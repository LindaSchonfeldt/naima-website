import Customer from '../models/Customer.js'
import Order from '../models/Order.js'

// Create a new order
// This will also create a customer if they don't exist
export const createOrder = async (req, res) => {
  let customer = null

  try {
    // Find or create customer
    customer = await Customer.findOne({ email: req.body.email })
    if (!customer) {
      customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        company: req.body.company || undefined
      })
      await customer.save()
    }
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }

  try {
    // Calculate totalCost from items
    const items = req.body.items || []
    const totalCost = items.reduce(
      (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
      0
    )

    const order = new Order({
      ...req.body,
      customer: customer._id,
      totalCost
    })
    await order.save()
    res.status(201).json({ message: 'Order received!', order })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get all orders with customer details
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('customer')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get order by ID with customer details
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer')
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (error) {
    console.error('getOrderById error:', error)
    res.status(500).json({ error: error.message || 'Server error' })
  }
}

// Update an order
export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json({ message: 'Order deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get all orders for a customer
export const getOrdersForCustomer = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.id })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }
  next()
}
