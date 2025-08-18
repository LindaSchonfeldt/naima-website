import styled from 'styled-components'

import { PageTitle } from '../components/PageTitle'
import { ProductCard } from '../components/ProductCard'
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.sm};
  max-width: 1200px;

  /* Start centering immediately, not just at xs */
  @media (min-width: 1px) {
    margin: 0;
  }

  ${media.lg} {
    display: grid;
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
