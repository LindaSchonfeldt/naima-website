import RetailLocation from '../models/RetailLocation.js'

export const listRetailers = async (req, res) => {
  const { brand, city, limit = 100 } = req.query
  const q = {}
  if (brand) q.brand = brand
  if (city) q.city = city
  const items = await RetailLocation.find(q).limit(Number(limit))
  res.json({ items })
}

export const retailersNear = async (req, res) => {
  const { lat, lng, km = 10 } = req.query
  if (!lat || !lng) return res.status(400).json({ error: 'lat & lng required' })
  const meters = Number(km) * 1000
  const items = await RetailLocation.find({
    location: {
      $near: {
        $geometry: { type: 'Point', coordinates: [Number(lng), Number(lat)] },
        $maxDistance: meters
      }
    }
  }).limit(200)
  res.json({ items })
}
