// backend/scripts/seedData.js
import mongoose from 'mongoose'
import Product from '../models/Product.js'
import Partner from '../models/Partner.js'
import dotenv from 'dotenv'

dotenv.config()

const seedProducts = async () => {
  const products = [
    {
      name: 'Cinnamon Bun Bite',
      description:
        'Two layer bites in naimas signature square format of 34g or 20g per bite.',
      price: 12.99,
      category: 'bites',
      images: [
        {
          url: '/images/cinnamon.webp',
          alt: 'Cinnamon Bun Bite',
          isPrimary: true
        }
      ],
      ingredients: [
        'Dates',
        'coconut oil',
        'gluten-free oats',
        'rice syrup',
        'water',
        'coconut flakes',
        'Ceylon cinnamon',
        'cardamom',
        'sea salt',
        'vanilla'
      ],
      allergens: [
        'Contains gluten-free oat flakes',
        'Nut Free - May contain traces of cashews, pecans, pistachios'
      ],
      nutrition: {
        per34g: {
          energy: '584.5 kJ (139.7 kcal)',
          fat: '8.16g',
          saturatedFat: '6.8g',
          carbohydrates: '14.96g',
          sugars: '10.2g',
          fiber: '1.6g',
          protein: '1.19g',
          salt: '0.1g'
        }
      },
      sizes: [
        { weight: '34g', packaging: '35 x 34g' },
        { weight: '20g', packaging: '60 x 20g' }
      ],
      keywords: ['glutenfree', 'lactosefree', 'plantbased'],
      featured: false,
      status: 'active'
    },
    {
      name: 'Blueberry & Vanilla Cheezecake',
      description: 'Creamy Cheezecakes in our signature square format.',
      price: 8.99,
      category: 'cheezecakes',
      images: [
        {
          url: '/images/blueberry.jpg',
          alt: 'Blueberry & Vanilla Cheezecake',
          isPrimary: true
        }
      ],
      ingredients: [
        'Dates*',
        'soaked cashew nuts*',
        'rice syrup*',
        'water',
        'coconut flakes*',
        'gluten-free oats*',
        'coconut oil*',
        'buckwheat*',
        'freeze-dried blueberries*',
        'vanilla extract*',
        'salt*',
        'butterfly pea flower*',
        'ashwagandha*',
        "lion's mane*",
        'reishi*'
      ],
      allergens: [
        'Contains cashew nuts',
        'Contains gluten-free oats',
        'May contain traces of other nuts'
      ],
      nutrition: {
        per55g: {
          energy: '907.5 kJ (214.5 kcal)',
          fat: '12.65g',
          saturatedFat: '7.7g',
          carbohydrates: '21.45g',
          sugars: '13.2g',
          fiber: '2.64g',
          protein: '3.4g',
          salt: '0.12g'
        },
        per30g: {
          energy: '462 kJ (109.2 kcal)',
          fat: '6.44g',
          saturatedFat: '3.92g',
          carbohydrates: '10.92g',
          sugars: '6.72g',
          fiber: '1.34g',
          protein: '1.7g',
          salt: '0.06g'
        }
      },
      sizes: [
        { weight: '55g', packaging: '35 x 55g' },
        { weight: '30g', packaging: '60 x 30g' }
      ],
      keywords: ['glutenfree', 'plantbased', 'superfoods'],
      featured: true,
      status: 'active'
    },
    {
      name: 'Lemoncurd Cheezecake',
      description:
        'Creamy Cheezecakes in our signature square format. Comes in boxes 60 x 30g or 35 x 55g. Order them from our listed partners.',
      price: 15.99,
      category: 'cheezecakes',
      images: [
        {
          url: '/images/lemoncurd.webp',
          alt: 'Lemoncurd Cheezecake',
          isPrimary: true
        }
      ],
      ingredients: [
        'Dates*',
        'soaked cashew nuts*',
        'rice syrup*',
        'coconut oil*',
        'coconut flakes*',
        'gluten-free oats*',
        'water',
        'buckwheat*',
        'lemon juice*',
        'turmeric*',
        'ashwagandha*',
        'lucuma*'
      ],
      allergens: [
        'Contains cashew nuts',
        'Contains gluten-free oats',
        'May contain traces of other nuts'
      ],
      nutrition: {
        per55g: {
          energy: '935 kJ (220 kcal)',
          fat: '13.2g',
          saturatedFat: '8.25g',
          carbohydrates: '21.45g',
          sugars: '12.65g',
          fiber: '2.7g',
          protein: '3.4g',
          salt: '0.12g'
        },
        per30g: {
          energy: '476 kJ (112 kcal)',
          fat: '6.72g',
          saturatedFat: '4.48g',
          carbohydrates: '10.92g',
          sugars: '6.44g',
          fiber: '1.34g',
          protein: '1.7g',
          salt: '0.02g'
        }
      },
      sizes: [
        { weight: '55g', packaging: '35 x 55g' },
        { weight: '30g', packaging: '60 x 30g' }
      ],
      keywords: ['glutenfree', 'plantbased', 'superfoods'],
      featured: false,
      status: 'active'
    },
    {
      name: 'Raspberry & Licorice Cheezecake',
      description:
        'Creamy Cheezecakes in our signature square format. Comes in boxes 60 x 30g or 35 x 55g. Order them from our listed partners.',
      price: 10.99,
      category: 'cheezecakes',
      images: [
        {
          url: '/images/raspberry.webp',
          alt: 'Raspberry & Licorice Cheezecake',
          isPrimary: true
        }
      ],
      ingredients: [
        'Dates*',
        'soaked cashew nuts*',
        'rice syrup*',
        'coconut oil*',
        'coconut flakes*',
        'gluten-free oats*',
        'water',
        'buckwheat*',
        'lemon juice*',
        'licorice powder*',
        'salmiak',
        'freeze-dried raspberries*',
        'amla*',
        'baobab*',
        'hibiscus*',
        'maca*',
        'beetroot powder*'
      ],
      allergens: [
        'Contains cashew nuts',
        'Contains gluten-free oats',
        'May contain traces of other nuts'
      ],
      nutrition: {
        per55g: {
          energy: '935 kJ (220 kcal)',
          fat: '13.2g',
          saturatedFat: '8.25g',
          carbohydrates: '21.45g',
          sugars: '12.65g',
          fiber: '2.7g',
          protein: '3.4g',
          salt: '0.12g'
        },
        per30g: {
          energy: '476 kJ (112 kcal)',
          fat: '6.72g',
          saturatedFat: '4.2g',
          carbohydrates: '10.92g',
          sugars: '6.44g',
          fiber: '1.4g',
          protein: '1.7g',
          salt: '0.06g'
        }
      },
      sizes: [
        { weight: '55g', packaging: '35 x 55g' },
        { weight: '30g', packaging: '60 x 30g' }
      ],
      keywords: ['glutenfree', 'plantbased', 'superfoods'],
      featured: false,
      status: 'active'
    },
    {
      name: 'Chocolate Ball Bite',
      description:
        'Two layer bites in naimas signature square format of 34g or 20g per bite. Comes in boxes 60 x 20g or 35 x 34g.',
      price: 9.99,
      category: 'bites',
      images: [
        {
          url: '/images/chocolate.webp',
          alt: 'Chocolate Ball Bite',
          isPrimary: true
        }
      ],
      ingredients: [
        'Dates',
        'coconut oil',
        'rice syrup',
        'gluten-free oats',
        'coconut flakes',
        'brewed coffee (water, coffee)',
        'cocoa',
        'reishi',
        'sea salt'
      ],
      allergens: [
        'Contains gluten-free oat flakes',
        'Nut free - May contain traces of cashews, pecans, pistachios, hazelnuts, and peanuts'
      ],
      nutrition: {
        per34g: {
          energy: '592 kJ (141 kcal)',
          fat: '8.84g',
          saturatedFat: '7.14g',
          carbohydrates: '13.6g',
          sugars: '9.86g',
          fiber: '2.38g',
          protein: '1.67g',
          salt: '0.09g'
        }
      },
      sizes: [
        { weight: '34g', packaging: '35 x 34g' },
        { weight: '20g', packaging: '60 x 20g' }
      ],
      keywords: ['glutenfree', 'lactosefree', 'plantbased'],
      featured: true,
      status: 'active'
    },
    {
      name: 'Limited Edition Treats',
      description:
        'Straciatella & Coal / Matcha & Lime / Semla / Chocolate & Saffron / Lingonberry & Gingerbread and more variants depending on season and collaboration. Contact us for more information',
      price: 0,
      category: 'limited',
      images: [
        {
          url: '/images/limited.webp', // ✅ Already correct
          alt: 'Limited Edition Treats',
          isPrimary: true
        }
      ],
      ingredients: ['Varies by variant - contact for specific information'],
      allergens: [
        'Allergens vary by variant - contact for specific information'
      ],
      nutrition: {
        // Empty as it varies by variant
      },
      sizes: [{ weight: 'Various', packaging: 'Contact for details' }],
      keywords: ['limited', 'seasonal', 'collaboration'],
      featured: false,
      status: 'limited'
    }
  ]

  await Product.insertMany(products)
  console.log('Products seeded!')
}

const seedPartners = async () => {
  const partners = [
    {
      name: 'Yasuragi',
      type: 'served_at',
      logo: { url: '/images/partners/yasuragi.svg', alt: 'Yasuragi' }, // ✅ Add actual logo
      isActive: true
    },
    {
      name: 'Radisson Hotels',
      type: 'served_at',
      logo: { url: '/images/partners/radisson.svg', alt: 'Radisson Hotels' }, // ✅ Add actual logo
      isActive: true
    },
    {
      name: '7-Eleven',
      type: 'served_at',
      logo: { url: '/images/partners/7eleven.svg', alt: '7-Eleven' }, // ✅ Add actual logo
      isActive: true
    },
    {
      name: 'Strawberry',
      type: 'served_at',
      logo: { url: '/images/partners/strawberry.svg', alt: 'Strawberry' }, // ✅ Add actual logo
      isActive: true
    },
    {
      name: 'Johan & Nyström',
      type: 'served_at',
      logo: {
        url: '/images/partners/johan-nystrom.png',
        alt: 'Johan & Nyström'
      }, // ✅ Add actual logo
      isActive: true
    },
    {
      name: 'Martin & Servera',
      type: 'catering_partner',
      logo: { url: null, alt: 'Martin & Servera' },
      website: 'https://martinservera.se',
      isActive: true
    },
    {
      name: 'Svensk Cater',
      type: 'catering_partner',
      logo: { url: null, alt: 'Svensk Cater' },
      website: 'https://svenskcater.se',
      isActive: true
    },
    {
      name: 'Menigo',
      type: 'catering_partner',
      logo: { url: null, alt: 'Menigo' },
      website: 'https://menigo.se',
      isActive: true
    }
  ]

  await Partner.insertMany(partners)
  console.log('Partners seeded!')
}

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: 'naima-website'
    })

    console.log('Connected to MongoDB: naima-website')

    // Clear existing data
    await Product.deleteMany({})
    await Partner.deleteMany({})
    console.log('Cleared existing data')

    // Seed new data
    await seedProducts()
    await seedPartners()

    console.log('Database seeded successfully!')
    console.log(`✅ Seeded 6 products and 8 partners`)
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

runSeed()
