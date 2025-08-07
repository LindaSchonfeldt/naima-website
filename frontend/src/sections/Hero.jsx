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
  padding: 2rem;
`

const StyledH1 = styled.h1`
  position: absolute;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text.hero};
  text-align: left;
  z-index: 10;
  left: 1rem;
  top: 3rem;
  transform: translateY(-50%);
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: ${(props) => props.theme.fonts.weights.bold};

  ${media.sm} {
    font-size: 2.5rem;
    left: 2rem;
  }

  ${media.md} {
    font-size: 3rem;
    left: 3rem;
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
