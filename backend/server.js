import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import companyRoutes from './routes/companyRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import partnerRoutes from './routes/partnerRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()

// Increase listeners limit
import { EventEmitter } from 'events';
EventEmitter.defaultMaxListeners = 20;

const mongoUrl = process.env.MONGO_URL
const port = process.env.PORT || 3001

// Connect to MongoDB
mongoose
  .connect(mongoUrl, {
    dbName: 'naima-website'
  })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas')
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error)
  })

const app = express()

// CORS configuration
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://127.0.0.1:5173'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(express.json())

// Add logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

// Register routes
app.use('/api/products', productRoutes)
app.use('/api/partners', partnerRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/companies', companyRoutes)
app.use('/api/contact', contactRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Naima API is running!' })
})

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
