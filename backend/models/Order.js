import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, // Reference
  // ...other fields
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  instructions: { type: String },
  createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', orderSchema)
export default Order
