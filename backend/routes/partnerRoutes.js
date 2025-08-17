import express from 'express'

import {
  getAllPartners,
  getCateringPartners,
  getServedAtPartners
} from '../controllers/partnerController.js'

const router = express.Router()

// Admin routes
router.get('/', getAllPartners)
router.get('/served-at', getServedAtPartners)
router.get('/catering', getCateringPartners)

export default router
