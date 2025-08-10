import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/naima-website'
const port = process.env.PORT || 8080
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'

// Connect to MongoDB with better error handling
mongoose
  .connect(mongoUrl, {
    dbName: 'naima-website' // Specify your database name
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error)
  })

mongoose.Promise = Promise

const app = express()

// CORS configuration
app.use(
  cors({
    origin: [frontendUrl, 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Naima!')
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})
