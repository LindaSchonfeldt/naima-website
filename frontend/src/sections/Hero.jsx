import styled from 'styled-components'

import { Carousel } from '../components/Carousel'
import { homeCarouselItems } from '../data/carouselData'
import { media } from '../styles/media'

const StyledHero = styled.section`
  position: relative;
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  margin: 0;
  overflow: hidden; /* ✅ Prevent content from spilling outside */

  ${media.sm} {
    height: 70vh;
  }

  ${media.md} {
    height: ${(props) =>
      props.theme.layout?.heroHeight || 'calc(100vh - 80px)'};
    padding: ${(props) => props.theme.spacing.xl};
  }
`

const StyledH1 = styled.h1`
  position: absolute;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text.hero};
  text-align: left;
  z-index: 10;
  left: ${(props) => props.theme.spacing.sm};
  top: ${(props) => props.theme.spacing.md};
  transform: none;
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: ${(props) => props.theme.fonts.weights.heavy};

  ${media.sm} {
    font-size: 2rem;
    left: ${(props) => props.theme.spacing.md};
    top: ${(props) => props.theme.spacing.lg};
  }

  ${media.md} {
    font-size: 3rem;
    left: ${(props) => props.theme.spacing.xl};
    top: ${(props) => props.theme.spacing.xl};
  }

  ${media.lg} {
    font-size: 4rem;
    left: 4rem;
  }

  ${media.xl} {
    font-size: 5rem;
  }

  ${media.xxl} {
    font-size: 6rem;
  }
`

const CursiveText = styled.span`
  font-style: italic;
`

export const Hero = ({
  title = 'Fika with benefits',
  subtitle = null,
  carouselItems = homeCarouselItems,
  showCarousel = true
}) => {
  // ✅ Prevent rendering if no items
  if (!carouselItems || carouselItems.length === 0) {
    return <div>Loading hero content...</div>
  }

  return (
    <StyledHero>
      {showCarousel && (
        <Carousel
          items={carouselItems}
          autoPlay={true}
          autoPlayInterval={5000}
          showArrows={true}
          showIndicators={true}
          slidesToShow={1}
        />
      )}
      <StyledH1>
        {title.includes('benefits') ? (
          <>
            Fika with <CursiveText>benefits</CursiveText>
          </>
        ) : (
          title
        )}
        {subtitle && (
          <div style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
            {subtitle}
          </div>
        )}
      </StyledH1>
    </StyledHero>
  )
}
