import mongoose from 'mongoose'

const RetailLocationSchema = new mongoose.Schema({
  brand: { type: String, index: true },
  name: String,
  street: String,
  city: String,
  country: String,
  fullAddress: String,
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true } // [lng, lat]
  }
}, { timestamps: true })

RetailLocationSchema.index({ location: '2dsphere' })
export default mongoose.model('RetailLocation', RetailLocationSchema)
