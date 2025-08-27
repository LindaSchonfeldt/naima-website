import { PageTitle } from '../components/PageTitle'
import { ProductCard } from '../components/ProductCard'
import { media } from '../styles/media'
import styled from 'styled-components'

const StyledProducts = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: left;
  padding: 0 8px;
  max-width: 1200px;
  margin: 0 auto;

  ${media.md} {
    padding: ${(props) => props.theme.spacing.xl};
  }
`

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing.md};
  margin: 0 auto;
  align-items: stretch;
  padding: 0 8px;

  ${media.sm} {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  ${media.md} {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
      <PageTitle>Fika selection</PageTitle>
      <StyledProductsGrid>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onOrder={onOrder} />
        ))}
      </StyledProductsGrid>
    </StyledProducts>
  )
}
