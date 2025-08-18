import express from 'express'

const router = express.Router()

import {
  loginCompany,
  registerCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from '../controllers/companyControllers.js'

router.post('/register', registerCompany)
router.post('/login', loginCompany)

// Admin routes
router.get('/', getAllCompanies)
router.get('/:id', getCompanyById)
router.put('/:id', updateCompany)
router.delete('/:id', deleteCompany)

export default router
