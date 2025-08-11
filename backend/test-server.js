import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001 // Changed port

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

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  console.log('Root endpoint hit')
  res.json({ message: 'Test server is working on port 3001!' })
})

app.get('/api/test', (req, res) => {
  console.log('API test endpoint hit')
  res.json({ message: 'API test successful on port 3001!' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(port, () => {
  console.log(`🚀 Test server running on http://localhost:${port}`)
})

// Handle server errors
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
})

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err)
})
