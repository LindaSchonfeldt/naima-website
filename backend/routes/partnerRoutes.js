import express from 'express'
import Partner from '../models/Partner.js'

const router = express.Router()

// Get all partners with optional type filtering
router.get('/', async (req, res) => {
  try {
    const { type, isActive = true } = req.query

    let query = Partner.find({ isActive: isActive === 'true' })

    if (type) {
      query = query.where('type').equals(type)
    }

    const partners = await query.sort({ name: 1 })
    res.json(partners)
  } catch (error) {
    console.error('Error fetching partners:', error)
    res.status(500).json({ message: 'Failed to fetch partners' })
  }
})

// Get partners served at
router.get('/served-at', async (req, res) => {
  try {
    const partners = await Partner.findServedAt()
    res.json(partners)
  } catch (error) {
    console.error('Error fetching served-at partners:', error)
    res.status(500).json({ message: 'Failed to fetch served-at partners' })
  }
})

// Get catering partners
router.get('/catering', async (req, res) => {
  try {
    const partners = await Partner.findCateringPartners()
    res.json(partners)
  } catch (error) {
    console.error('Error fetching catering partners:', error)
    res.status(500).json({ message: 'Failed to fetch catering partners' })
  }
})

export default router
