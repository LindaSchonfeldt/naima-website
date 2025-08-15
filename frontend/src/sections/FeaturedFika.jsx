import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FeaturedProduct } from '../components/FeaturedProduct'
import { SectionTitle } from '../components/SectionTitle'
import useProductStore from '../stores/useProductStore'
import { media } from '../styles/media'

const StyledFeaturedFika = styled.section`
  background: ${(props) => props.theme.colors.background || '#f9f9f9'};
`

const InfoSection = styled.div`
  text-align: left;
  margin: ${(props) => props.theme.spacing.sm};

  ${media.md} {
    margin: ${(props) => props.theme.spacing.md};
`

const Description = styled.p`
  text-align: left;
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;

  ${media.md} {
    margin-bottom: 2rem;
  }
`

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin: 0 auto;

  ${media.md} {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
`

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #d32f2f;
  background: #ffebee;
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
`

export const FeaturedFika = () => {
  const { featuredProducts, loading, error, fetchFeaturedProducts } =
    useProductStore()
  const hasFetched = useRef(false)

  useEffect(() => {
    // ✅ More defensive checking
    if (
      !hasFetched.current &&
      (!featuredProducts || featuredProducts.length === 0)
    ) {
      // ✅ Wrap in try-catch
      try {
        fetchFeaturedProducts()
        hasFetched.current = true
      } catch (err) {
        console.error('❌ Error in FeaturedFika useEffect:', err)
      }
    }
  }, [fetchFeaturedProducts]) // ✅ Add fetchFeaturedProducts to dependencies

  // ✅ Loading state
  if (loading && (!featuredProducts || featuredProducts.length === 0)) {
    return (
      <StyledFeaturedFika>
        <SectionTitle>Featured Treats</SectionTitle>
        <LoadingMessage>Loading featured products...</LoadingMessage>
      </StyledFeaturedFika>
    )
  }

  // ✅ Error state
  if (error) {
    return (
      <StyledFeaturedFika>
        <InfoSection>
          <SectionTitle>Featured Treats</SectionTitle>
        </InfoSection>
        <ErrorMessage>
          Error loading products: {error}
          <br />
          <button
            onClick={() => {
              hasFetched.current = false
              fetchFeaturedProducts()
            }}
          >
            Try Again
          </button>
        </ErrorMessage>
      </StyledFeaturedFika>
    )
  }

  // ✅ Safe array check
  const safeProducts = Array.isArray(featuredProducts) ? featuredProducts : []

  return (
    <StyledFeaturedFika>
      <InfoSection>
        <SectionTitle>Featured Treats</SectionTitle>
        <Description>
          Every bite tells a story of wellness. Our handcrafted treats combine
          traditional Swedish fika culture with modern superfoods.
        </Description>
      </InfoSection>

      {safeProducts.length > 0 ? (
        <FeaturedGrid>
          {safeProducts.map((product) => (
            <FeaturedProduct
              key={product?._id || Math.random()}
              product={product}
            />
          ))}
        </FeaturedGrid>
      ) : (
        <LoadingMessage>No featured products available.</LoadingMessage>
      )}
    </StyledFeaturedFika>
  )
}
