import styled from 'styled-components'
import { media } from '../styles/media'

import { Carousel } from '../components/Carousel'
import { homeCarouselItems } from '../data/carouselData'

const StyledHero = styled.section`
  position: relative;
  width: 100%;
  height: ${(props) => props.theme.layout?.heroHeight || 'calc(100vh - 80px)'};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.xl};
`

const StyledH1 = styled.h1`
  position: absolute;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text.hero};
  text-align: left;
  z-index: 10;
  left: ${(props) => props.theme.spacing.md};
  top: ${(props) => props.theme.spacing.xl};
  transform: none;
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: ${(props) => props.theme.fonts.weights.heavy};

  ${media.sm} {
    font-size: 2.5rem;
    left: ${(props) => props.theme.spacing.xl};
  }

  ${media.md} {
    font-size: 3rem;
    left: ${(props) => props.theme.spacing.xxl};
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
  console.log('Hero rendering with items:', carouselItems)

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
          <div style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
            {subtitle}
          </div>
        )}
      </StyledH1>
    </StyledHero>
  )
}
