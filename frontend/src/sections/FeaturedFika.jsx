import { useEffect, useRef } from 'react'
import styled from 'styled-components'

import { FeaturedProduct } from '../components/FeaturedProduct'
import Reveal from '../components/Reveal'
import useProductStore from '../stores/useProductStore'
import { media } from '../styles/media'

const StyledFeaturedFika = styled.section`
  background: ${(props) => props.theme.colors.background || '#f9f9f9'};
`

const StyledH2 = styled.h2`
  font-size: ${(props) => props.theme.typography.h2.fontSize};
  font-weight: ${(props) => props.theme.typography.h2.fontWeight};
  line-height: ${(props) => props.theme.typography.h2.lineHeight};
  margin-bottom: ${(props) => props.theme.spacing.md};
`

const InfoSection = styled.div`
  text-align: left;
  margin: ${(props) => props.theme.spacing.sm};

  ${media.md} {
    margin: ${(props) => props.theme.spacing.md};
  }
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

const FeaturedGrid = styled(Reveal)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin: 0 auto;

  ${media.md} {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }

  /* Animate only the direct children (your <FeaturedProduct />) */
  & > * {
    opacity: 0;
    transform: translateY(15px);
    animation: fg-card-in 420ms ease both;
    animation-play-state: paused; /* wait until grid is in view */
    will-change: transform;
  }

  /* Start animations when Reveal sets data-inview="true" */
  &[data-inview="true"] > * { animation-play-state: running; }

  /* Simple repeating stagger (works for 1–n columns) */
  &[data-inview="true"] > *:nth-child(3n + 1) { animation-delay: 0ms; }
  &[data-inview="true"] > *:nth-child(3n + 2) { animation-delay: 80ms; }
  &[data-inview="true"] > *:nth-child(3n + 3) { animation-delay: 160ms; }

  @keyframes fg-card-in { to { opacity: 1; transform: none; } }

  @media (prefers-reduced-motion: reduce) {
    & > * { animation: none; opacity: 1; transform: none; }
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
        <StyledH2>Featured treats</StyledH2>
        <LoadingMessage>Loading featured products...</LoadingMessage>
      </StyledFeaturedFika>
    )
  }

  // ✅ Error state
  if (error) {
    return (
      <StyledFeaturedFika>
        <InfoSection>
          <StyledH2>Featured treats</StyledH2>
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
        <StyledH2>Featured treats</StyledH2>
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
