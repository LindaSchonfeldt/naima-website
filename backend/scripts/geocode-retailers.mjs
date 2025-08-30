import fs from 'node:fs/promises'

// 1) read seed (no coords yet)
const inputPath = 'backend/data/seedRetailers.json'
const outputPath = 'backend/data/geocodedRetailers.json'
const input = JSON.parse(await fs.readFile(inputPath, 'utf8'))
const out = []

// Manual overrides for tricky addresses
const OVERRIDES = {
  'Bibliotekstorget 4, Solna, Sweden':
    'Bibliotekstorget 4, 171 45 Solna, Sweden',
  'Stjärntorget 2 (Plan 1 bredvid SATS), Solna, Sweden':
    'Stjärntorget 2, 169 79 Solna, Sweden' // Mall of Scandinavia
}

// 2) Nominatim (OpenStreetMap) geocoder — free, no key.
// Be polite: add a User-Agent and delay between calls.
const GEOCODE = async (q) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    q
  )}&limit=1&countrycodes=se&addressdetails=1&accept-language=en`
  const r = await fetch(url, {
    headers: { 'User-Agent': 'NaimaWebsite/1.0 (contact@naima.example)' }
  })
  if (!r.ok) return null
  const j = await r.json()
  const f = j?.[0]
  return f
    ? { lat: Number(f.lat), lng: Number(f.lon), label: f.display_name }
    : null
}

for (const item of input) {
  // Builds the default query, then apply overrides if present
  const rawQuery = `${item.street}, ${item.city}, ${item.country}`
  const query = OVERRIDES[rawQuery] || rawQuery

  const res = await GEOCODE(query)
  if (!res) {
    console.warn('No match:', query)
    continue
  }
  out.push({
    ...item,
    fullAddress: res.label || `${item.street}, ${item.city}, ${item.country}`,
    location: { type: 'Point', coordinates: [res.lng, res.lat] } // [lng, lat]
  })
  await new Promise((r) => setTimeout(r, 1200)) // be a good citizen
}

await fs.writeFile(outputPath, JSON.stringify(out, null, 2))
