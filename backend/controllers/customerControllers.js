import Customer from '../models/Customer.js'
import Order from '../models/Order.js'

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find()
    res.json(customers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json(customer)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Create new customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, address, phone } = req.body
    const customer = new Customer({ name, email, address, phone })
    await customer.save()
    res.status(201).json(customer)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Update customer by ID
export const updateCustomerById = async (req, res) => {
  try {
    // If the user is a company, check if they own this customer profile
    if (req.user.role === 'company') {
      const customer = await Customer.findById(req.params.id)
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' })
      }
      // Only allow update if the company owns this customer profile
      if (String(customer.company) !== String(req.user.companyId)) {
        return res.status(403).json({ message: 'Forbidden: Not your profile' })
      }
    }

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
}

// Delete customer by ID
export const deleteCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' })
    }
    res.json({ message: 'Customer deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
