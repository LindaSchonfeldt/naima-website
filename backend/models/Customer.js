import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Customer', customerSchema)
export default Order
