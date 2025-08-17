import express from 'express'

import {
  loginCompany,
  registerCompany
} from '../controllers/companyControllers.js'

router.post('/login', loginCompany)

export default router
