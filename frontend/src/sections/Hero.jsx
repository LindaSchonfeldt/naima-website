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
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text.hero};
  text-align: left;
  z-index: 10;
  left: ${(props) => props.theme.spacing.sm};
  top: ${(props) => props.theme.spacing.md};
  transform: none;
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: ${(props) => props.theme.fonts.weights.heavy};

  ${media.sm} {
    font-size: 3rem;
    left: ${(props) => props.theme.spacing.md};
    top: ${(props) => props.theme.spacing.lg};
  }

  ${media.md} {
    font-size: 4rem;
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

const StyledSlogan = styled.p`
  position: absolute;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.hero};
  text-align: left;
  z-index: 10;
  left: ${(props) => props.theme.spacing.md};
  bottom: ${(props) => props.theme.spacing.xxl};
  /* Accessibility improvements: more contrast + readable over images */
  color: #fff;
  background: rgba(0, 0, 0, 0.52); /* semi-opaque panel */
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  outline: none;
  transition: box-shadow 160ms ease, transform 160ms ease;

  &:focus {
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6),
      0 0 0 3px rgba(255, 255, 255, 0.06);
    transform: translateY(-1px);
  }

  /* Respect high contrast / forced-colors modes */
  @media (forced-colors: active) {
    background: Window;
    color: WindowText;
    box-shadow: none;
  }

  /* prefer reduced transparency: avoid backdrop effects */
  @media (prefers-reduced-transparency: reduce) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  ${media.sm} {
    font-size: 2rem;
    left: ${(props) => props.theme.spacing.xxl};
    bottom: ${(props) => props.theme.spacing.lg};
  }
  ${media.md} {
    font-size: 3rem;
    bottom: ${(props) => props.theme.spacing.xxl};
  }
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
          showArrows={false}
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
      <StyledSlogan>
        just hits <CursiveText>different</CursiveText>
      </StyledSlogan>
    </StyledHero>
  )
}
