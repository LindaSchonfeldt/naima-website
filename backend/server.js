import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Import your routes
import productRoutes from './routes/productRoutes.js'
import partnerRoutes from './routes/partnerRoutes.js'

dotenv.config()

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

app.get('/', (req, res) => {
  res.json({ message: 'Naima API is running!' })
})

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
})
