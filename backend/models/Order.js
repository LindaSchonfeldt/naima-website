import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  name: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  email: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  instructions: { type: String },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number
    }
  ],

  // changed: keep Number stored, but add a getter that rounds to 2 decimals for output
  totalCost: {
    type: Number,
    get: (v) => (v == null ? v : Math.round(v * 100) / 100)
  },

  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
})

// ensure getters run when converting to JSON / objects
orderSchema.set('toJSON', { getters: true, virtuals: false })
orderSchema.set('toObject', { getters: true, virtuals: false })

const Order = mongoose.model('Order', orderSchema)
export default Order
