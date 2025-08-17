import express from 'express'

const router = express.Router() // ← Add this line

import {
  loginCompany,
  registerCompany
} from '../controllers/companyControllers.js'

router.post('/register', registerCompany)
router.post('/login', loginCompany)

export default router
