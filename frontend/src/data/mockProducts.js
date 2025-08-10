const mockProducts = [
  {
    id: 1,
    name: 'Cinnamon Bun Bite',
    description:
      'Two layer bites in naimas signature square format of 34g or 20g per bite.',
    ingredients:
      'Dates, coconut oil, gluten-free oats, rice syrup, water, coconut flakes, Ceylon cinnamon, cardamom, sea salt, vanilla',
    allergens:
      'Contains gluten-free oat flakes. Nut Free - May contain traces of cashews, pecans, pistachios.',
    nutritionPer34g:
      '584.5 kJ (139.7 kcal), fat 8.16g (saturated fat 6.8g), carbohydrates 14.96g (sugars 10.2g), fiber 1.6g, protein 1.19g, salt 0.1g',
    price: 12.99,
    image: '/images/cinnamon.webp'
  },
  {
    id: 2,
    name: 'Blueberry & Vanilla Cheezecake',
    description: 'Creamy Cheezecakes in our signature square format.',
    ingredients:
      'Dates*, soaked cashew nuts*, rice syrup*, water, coconut flakes*, gluten-free oats*, coconut oil*, buckwheat*, freeze-dried blueberries*, vanilla extract*, salt*, butterfly pea flower*, ashwagandha*, lion’s mane*, reishi*',
    nutritionPer55g:
      '907.5 kJ (214.5 kcal), fat 12.65g (saturated fat 7.7g), carbohydrates 21.45g (sugars 13.2g), fiber 2.64g, protein 3.4g, salt 0.12g.',
    nutritionPer30g:
      'Energy 462 kJ (109.2 kcal), fat 6.44 grams, of which saturated fat 3.92 grams, carbohydrates 10.92 grams, of which sugars 6.72 grams, fiber 1.34 grams, protein 1.7 grams, salt 0.06 grams.',
    price: 8.99,
    image: '/images/blueberry.jpg'
  },
  {
    id: 3,
    name: 'Lemoncurd Cheezecake',
    description:
      'Creamy Cheezecakes in our signature square format. Comes in boxes 60 x 30g or 35 x 55g. Order them from our listed partners.',
    price: 15.99,
    ingredients:
      'Dates*, soaked cashew nuts*, rice syrup*, coconut oil*, coconut flakes*, gluten-free oats*, water, buckwheat*, lemon juice*, turmeric*, ashwagandha*, lucuma*.',
    nutritionPer55g:
      '935 kJ (220 kcal), fat 13.2g (saturated fat 8.25g), carbohydrates 21.45g (sugars 12.65g), fiber 2.7g, protein 3.4g, salt 0.12g.',
    nutritionPer30g:
      'Energy 476 kJ (112 kcal), fat 6.72 grams,of which saturated fat 4.48 grams, carbohydrates 10.92 grams, of which sugars 6.44 grams, fiber 1.34 grams, protein 1.7 grams, salt 0.02 grams.',
    image: '/images/lemoncurd.webp'
  },
  {
    id: 4,
    name: 'Raspberry & Licorice Cheezecake',
    description:
      'Creamy Cheezecakes in our signature square format. Comes in boxes 60 x 30g or 35 x 55g. Order them from our listed partners.',
    ingredients:
      'Dates*, soaked cashew nuts*, rice syrup*, coconut oil*, coconut flakes*, gluten-free oats*, water, buckwheat*, lemon juice*, licorice powder*, salmiak, freeze-dried raspberries*, amla*, baobab*, hibiscus*, maca*, beetroot powder*',
    nutritionPer55g:
      '935 kJ (220 kcal), fat 13.2g (saturated fat 8.25g), carbohydrates 21.45g (sugars 12.65g), fiber 2.7g, protein 3.4g, salt 0.12g',
    nutritionPer30g:
      'Energy 476 kJ (112 kcal), fat 6.72 grams, of which saturated fat 4.2 grams, carbohydrates 10.92 grams, of which sugars 6.44 grams, fiber 1.4 grams, protein 1.7 grams, salt 0.06 grams',
    price: 10.99,
    image: '/images/raspberry.webp'
  },
  {
    id: 5,
    name: 'Chocolate Ball Bite',
    description:
      'Two layer bites in naimas signature square format of 34g or 20g per bite. Comes in boxes 60 x 20g or 35 x 34g. ',
    ingredients:
      'Dates, coconut oil, rice syrup, gluten-free oats, coconut flakes, brewed coffee (water,coffee), cocoa, reishi, sea salt.',
    allergens:
      'Contains gluten-free oat flakes. Nut free - May contain traces of cashews, pecans, pistachios, hazelnuts, and peanuts.',
    nutritionPer34g:
      '592 kJ (141 kcal), fat 8.84g (saturated fat 7.14g), carbohydrates 13.6g (sugars 9.86g), fiber 2.38g, protein 1.67g, salt 0.09g.',
    price: 9.99,
    image: '/images/chocolate.webp'
  },
  {
    id: 6,
    name: 'Limited Edition Treats',
    description:
      'Straciatella & Coal / Matcha & Lime / Semla / Chocolate & Saffron / Lingonberry & Gingerbread and more variants depending on season and collaboration. Contact us for more information',
    ingredients: '',
    nutritionPer55g: '',
    nutritionPer30g: '',
    image: '/images/limited.webp'
  }
]
export default mockProducts
