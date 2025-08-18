import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: {
    type: String,
    enum: ['admin', 'company', 'customer'],
    default: 'admin'
  }
})

export default mongoose.model('Admin', adminSchema)
