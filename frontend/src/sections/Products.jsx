import styled from 'styled-components'

import { PageTitle } from '../components/PageTitle'
import { ProductCard } from '../components/ProductCard'
import { media } from '../styles/media'

const StyledProducts = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: left;

  ${media.sm} {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    padding: ${(props) => props.theme.spacing.md};
  }

  ${media.md} {
    padding: ${(props) => props.theme.spacing.xl};
  }
`

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${(props) => props.theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;
  align-items: stretch; // ensures all cards are equal height
`

export const Products = ({ products = [], onOrder }) => {
  if (!products || products.length === 0) {
    return (
      <StyledProducts>
        <PageTitle>Fika Selection</PageTitle>
        <p>No products available at the moment.</p>
      </StyledProducts>
    )
  }

  return (
    <StyledProducts>
      <PageTitle>Fika Selection</PageTitle>
      <StyledProductsGrid>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onOrder={onOrder} />
        ))}
      </StyledProductsGrid>
    </StyledProducts>
  )
}
