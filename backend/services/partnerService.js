import Partner from '../models/Partner.js'

export async function getServedAtPartners() {
  // business rule: only active partners
  return Partner.find({ servedAt: true, active: true })
    .sort({ order: 1 })
    .lean()
}

export async function getAllPartners() {
  return Partner.find({}).lean()
}
