import bcrypt from 'bcrypt'

import Company from '../models/Company.js'

export const createCompany = async ({
  name,
  email,
  password,
  address,
  contactPerson
}) => {
  if (!email || !password) throw new Error('Email and password required')

  const existing = await Company.findOne({ email })
  if (existing) {
    const err = new Error('Email already registered')
    err.code = 'ALREADY_EXISTS'
    throw err
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const company = new Company({
    name,
    email,
    password: hash,
    address,
    contactPerson
  })

  await company.save()
  // remove sensitive fields before returning
  const obj = company.toObject()
  delete obj.password
  return obj
}

export const findCompanyByEmail = async (email) => {
  return Company.findOne({ email }).select('+password') // if password select is excluded by default
}

/**
 * Authenticate a company by email + password.
 * Returns company object without password on success, otherwise null.
 */
export const authenticateCompany = async ({ email, password }) => {
  if (!email || !password) return null
  const company = await Company.findOne({ email }).select('+password')
  if (!company) return null
  const match = await bcrypt.compare(password, company.password)
  if (!match) return null
  const obj = company.toObject()
  delete obj.password
  return obj
}

/**
 * Get company by id (returns plain object)
 */
export const getCompanyById = async (id) => {
  if (!id) return null
  return Company.findById(id).lean()
}

/**
 * Update company by id. If updates.password is provided, it will be hashed.
 * Returns the updated company (without password).
 */
export const updateCompanyById = async (id, updates = {}) => {
  if (!id) throw new Error('Id required')
  const up = { ...updates }

  if (typeof up.password === 'string' && up.password.trim() !== '') {
    const salt = await bcrypt.genSalt(10)
    up.password = await bcrypt.hash(up.password, salt)
  } else {
    delete up.password
  }

  const updated = await Company.findByIdAndUpdate(id, up, { new: true }).lean()
  if (!updated) return null
  delete updated.password
  return updated
}

/**
 * Delete company by id.
 */
export const deleteCompanyById = async (id) => {
  if (!id) throw new Error('Id required')
  return Company.findByIdAndDelete(id)
}

/**
 * List companies with optional filter
 */
export const listCompanies = async (filter = {}) => {
  return Company.find(filter).lean()
}
