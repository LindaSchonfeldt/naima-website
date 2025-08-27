import { useEffect } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import { Products } from '../sections/Products'
import useProductStore from '../stores/useProductStore'

const StyledShop = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};

  ${media.sm} {
    display: flex;
  }
`

const Shop = () => {
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
    <StyledShop id="main" tabIndex={-1}>
      <Products
        products={products}
        loading={loading}
        error={error}
        onOrder={handleOrder}
        onFilterChange={handleFilterChange}
        filters={filters}
      />
    </StyledShop>
  )
}

export default Shop
