import mongoose from 'mongoose'
import fs from 'node:fs/promises'
import RetailLocation from '../models/RetailLocation.js'

await mongoose.connect(process.env.MONGO_URL, { dbName: 'naima-website' })
const data = JSON.parse(await fs.readFile('data/retailers.geocoded.json', 'utf8'))

await RetailLocation.deleteMany({})
await RetailLocation.insertMany(data)
console.log('Imported', data.length, 'retail locations')

await mongoose.disconnect()
