import express from 'express'

import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

import {
  loginCompany,
  logoutCompany,
  registerCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from '../controllers/companyControllers.js'

router.post('/register', registerCompany)
router.post('/login', loginCompany)
router.post('logout', logoutCompany)

// Admin routes
router.get('/', authenticate, authorize(['admin']), getAllCompanies)
router.get('/:id', authenticate, authorize(['admin']), getCompanyById)
router.put('/:id', authenticate, authorize(['admin']), updateCompany)
router.delete('/:id', authenticate, authorize(['admin']), deleteCompany)

export default router
