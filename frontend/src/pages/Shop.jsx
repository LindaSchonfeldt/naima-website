import { PageContainer } from '../components/PageContainer'
import { Products } from '../sections/Products'
import mockProducts from '../data/mockProducts'

const Shop = () => {
  const handleOrder = (product) => {
    console.log('Ordering:', product)
    // Add order logic here
  }

  return (
    <PageContainer>
      <Products products={mockProducts} onOrder={handleOrder} />
    </PageContainer>
  )
}

export default Shop
