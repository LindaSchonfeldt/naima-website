import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // Reference to Company
  createdAt: { type: Date, default: Date.now },
  role: {
    type: String,
    enum: ['admin', 'company', 'customer'],
    default: 'customer'
  }
})

const Customer = mongoose.model('Customer', customerSchema)
export default Customer
