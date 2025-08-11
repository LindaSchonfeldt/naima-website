import { useEffect } from 'react'
import styled from 'styled-components'

import { ProductCard } from '../components/ProductCard'
import { SectionTitle } from '../components/SectionTitle'
import useProductStore from '../stores/useProductStore'
import { media } from '../styles/media'

const StyledFeaturedFika = styled.section`
  background-color: ${(props) => props.theme.colors.surface};
  text-align: left;
  margin: ${(props) => props.theme.spacing.md};
`

const Description = styled.p`
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
  font-size: 1.1rem;
  margin: ${(props) => props.theme.spacing.md} 0;
`

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing.lg};
  width: 100%;
  margin: 0 auto;

  ${media.md} {
    grid-template-columns: 1fr 1fr;
  }
`

const LoadingMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: ${(props) => props.theme.colors.text.secondary};
`

const ErrorMessage = styled.p`
  grid-column: 1 / -1;
  text-align: center;
  color: ${(props) => props.theme.colors.status.error};
`

export const FeaturedFika = () => {
  const { featuredProducts, loading, error, fetchFeaturedProducts } =
    useProductStore()

  useEffect(() => {
    if (featuredProducts.length === 0) {
      fetchFeaturedProducts()
    }
  }, [featuredProducts.length, fetchFeaturedProducts])

  const handleOrder = (product) => {
    console.log('Ordering featured product:', product)
  }

  if (loading) {
    return (
      <StyledFeaturedFika>
        <LoadingMessage>Loading featured treats...</LoadingMessage>
      </StyledFeaturedFika>
    )
  }

  if (error) {
    return (
      <StyledFeaturedFika>
        <ErrorMessage>
          Failed to load featured treats. Please try again later.
        </ErrorMessage>
      </StyledFeaturedFika>
    )
  }

  return (
    <StyledFeaturedFika>
      <SectionTitle>Featured Treats</SectionTitle>
      <Description>
        Every bite tells a story of wellness. Our handcrafted treats combine
        traditional Swedish fika culture with modern superfoods.
      </Description>
      {featuredProducts.length > 0 ? (
        <FeaturedGrid>
          {featuredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onOrder={() => handleOrder(product)}
            />
          ))}
        </FeaturedGrid>
      ) : (
        <LoadingMessage>No featured products available.</LoadingMessage>
      )}
    </StyledFeaturedFika>
  )
}
