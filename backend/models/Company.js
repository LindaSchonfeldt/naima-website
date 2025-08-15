import mongoose from 'mongoose'

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  address: String,
  contactPerson: String
})

export default mongoose.model('Company', companySchema)
