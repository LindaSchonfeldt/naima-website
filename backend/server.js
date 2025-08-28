import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'

import companyRoutes from './routes/companyRoutes.js'
import contactRoutes from './routes/contactRoutes.js'
import customerRoutes from './routes/customerRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import partnerRoutes from './routes/partnerRoutes.js'
import productRoutes from './routes/productRoutes.js'
import retailerRoutes from './routes/retailerRoutes.js'

dotenv.config()
console.log('JWT_SECRET loaded length:', (process.env.JWT_SECRET || '').length)

// Increase listeners limit
import { EventEmitter } from 'events'
EventEmitter.defaultMaxListeners = 20

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
// allow only your frontend origin (recommended):
const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN ||
  'https://resetwithnaima.netlify.app' ||
  process.env.FRONTEND_URL ||
  'http://localhost:5173'

// Build a list of allowed origins, prefer env vars and fall back to sensible defaults
const allowedOrigins = [
  process.env.FRONTEND_ORIGIN,
  process.env.FRONTEND_URL,
  'https://resetwithnaima.netlify.app',
  'http://localhost:5173'
].filter(Boolean)

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests like curl/postman (no origin)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
      callback(new Error('CORS: origin not allowed'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
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
app.use('/api/retailers', retailerRoutes)

// List Endpoints API
app.get('/', (req, res) => {
  const endpoints = listEndpoints(app)
  res.json({
    message: 'Naima API is running!',
    endpoints: endpoints
  })
})

// health-check example
app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err)
  res.status(500).json({ error: err.message })
})

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
