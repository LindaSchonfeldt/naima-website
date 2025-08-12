import express from 'express'
import Order from '../models/Order.js'
import Customer from '../models/Customer.js'

const router = express.Router()

router.post('/orders', async (req, res) => {
  try {
    // Find or create customer
    let customer = await Customer.findOne({ email: req.body.email })
    if (!customer) {
      customer = new Customer({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone
      })
      await customer.save()
    }

    // Create order with reference to customer
    const order = new Order({
      ...req.body,
      customer: customer._id
    })
    await order.save()
    res.status(201).json({ message: 'Order received!', order })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get all orders with customer details
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('customer')
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
