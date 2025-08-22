import express from 'express'
import { listRetailers, retailersNear } from '../controllers/retailerController.js'

const router = express.Router()
router.get('/', listRetailers)
router.get('/near', retailersNear)

export default router
