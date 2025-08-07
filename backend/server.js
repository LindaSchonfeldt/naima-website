import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
const instagramRoutes = require('./routes/instagram')

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/final-project'
mongoose.connect(mongoUrl)
mongoose.Promise = Promise

const port = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Naima!')
})

// Use the Instagram routes
app.use('/api/instagram', instagramRoutes)
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
