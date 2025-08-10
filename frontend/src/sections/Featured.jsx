import styled from 'styled-components'

import { ProductCard } from '../components/ProductCard'
import { SectionTitle } from '../components/SectionTitle'
import { media } from '../styles/media'

const StyledFeaturedFika = styled.section`
  padding: ${(props) => props.theme.spacing.xl};
  background-color: ${(props) => props.theme.colors.surface};
  text-align: center;
`

const Description = styled.p`
  max-width: 600px;
  margin: 0 auto ${(props) => props.theme.spacing.lg};
  color: ${(props) => props.theme.colors.text.secondary};
  line-height: 1.6;
  font-size: 1.1rem;
`

const FeaturedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;

  ${media.md} {
    grid-template-columns: 1fr 1fr;
  }
`

export const FeaturedFika = () => {
  return (
    <StyledFeaturedFika>
      <SectionTitle>Featured Treats</SectionTitle>
      <Description>
        Every bite tells a story of wellness. Our handcrafted treats combine
        traditional Swedish fika culture with modern superfoods.
      </Description>
      <FeaturedGrid>
        <ProductCard>
          <h3>Blueberry Bliss Balls</h3>
          <p>Antioxidant-rich Nordic blueberries meet raw cacao</p>
        </ProductCard>
        <ProductCard>
          <h3>Golden Turmeric Cookies</h3>
          <p>Anti-inflammatory spices in a traditional Swedish cookie</p>
        </ProductCard>
      </FeaturedGrid>
    </StyledFeaturedFika>
  )
}
