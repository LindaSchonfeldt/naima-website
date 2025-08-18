import express from 'express'

import { authenticate, authorize } from '../middleware/auth.js'

const router = express.Router()

import {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin
} from '../controllers/adminControllers'

router.post('/register', authenticate, authorize(['admin']), registerAdmin)
router.post('/login', loginAdmin)
router.get('/', authenticate, authorize(['admin']), getAllAdmins)
router.get('/:id', authenticate, authorize(['admin']), getAdminById)
router.put('/:id', authenticate, authorize(['admin']), updateAdmin)
router.delete('/:id', authenticate, authorize(['admin']), deleteAdmin)

export default router
