import bcrypt from 'bcrypt'

import Company from '../models/Company.js'

export async function createCompany({
  name,
  email,
  password,
  address,
  contactPerson
}) {
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

export async function findCompanyByEmail(email) {
  return Company.findOne({ email }).select('+password') // if password select is excluded by default
}
