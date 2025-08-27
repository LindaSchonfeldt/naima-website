import { useEffect } from 'react'

import MotionReveal from '../components/MotionReveal'
import { PageContainer } from '../components/PageContainer'
import { Products } from '../sections/Products'
import useProductStore from '../stores/useProductStore'

const CompanyShop = () => {
  const { products, loading, error, filters, fetchProducts, setFilters } =
    useProductStore()

  useEffect(() => {
    fetchProducts(filters)
  }, [filters, fetchProducts])

  const handleOrder = (product) => {
    console.log('Ordering:', product)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <MotionReveal>
      <PageContainer>
        <Products
          products={products}
          loading={loading}
          error={error}
          onOrder={handleOrder}
          onFilterChange={handleFilterChange}
          filters={filters}
        />
      </PageContainer>
    </MotionReveal>
  )
}

export default CompanyShop
