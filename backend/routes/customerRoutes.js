import express from 'express'

import Customer from '../models/Customer.js'
import Order from '../models/Order.js'

const router = express.Router()

// Create new customer
router.post('/', async (req, res) => {
  try {
    const { name, email, address, phone } = req.body
    const customer = new Customer({ name, email, address, phone })
    await customer.save()
    res.status(201).json(customer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Get customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(customer)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update customer by ID
router.put('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(customer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete customer by ID
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json({ message: 'Customer deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all orders for a customer
router.get('/:id/orders', async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.params.id })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
