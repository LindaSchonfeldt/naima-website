import styled from 'styled-components'

import { ProductCard } from '../components/ProductCard'
import { SectionTitle } from '../components/SectionTitle'
import { media } from '../styles/media'

const StyledProducts = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: center;

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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${(props) => props.theme.spacing.lg};
  max-width: 1200px;

  /* Start centering immediately, not just at xs */
  @media (min-width: 1px) {
    margin: 0;
  }

  ${media.sm} {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
`

export const Products = ({ products = [], onOrder }) => {
  if (!products || products.length === 0) {
    return (
      <StyledProducts>
        <SectionTitle>Fika Selection</SectionTitle>
        <p>No products available at the moment.</p>
      </StyledProducts>
    )
  }

  return (
    <StyledProducts>
      <SectionTitle>Fika Selection</SectionTitle>
      <StyledProductsGrid>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onOrder={onOrder} />
        ))}
      </StyledProductsGrid>
    </StyledProducts>
  )
}
