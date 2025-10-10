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

/* 👇 gradient overlay for contrast */
const Shade = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;

  /* bottom-up darkening + slight side vignette */
  background: radial-gradient(
      120% 90% at 100% 50%,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0) 60%
    ),
    radial-gradient(
      120% 90% at 0% 50%,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0) 60%
    ),
    linear-gradient(
      to top,
      rgba(0, 0, 0, 0.55) 0%,
      rgba(0, 0, 0, 0.3) 35%,
      rgba(0, 0, 0, 0.1) 60%,
      rgba(0, 0, 0, 0) 100%
    );
  mix-blend-mode: multiply;

  @media (prefers-contrast: more) {
    background: linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0));
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
  text-shadow: 0 0.6px 1px rgba(0, 0, 0, 0.55);

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
      <Shade aria-hidden='true' />
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
      {/* replace or ensure your hero image uses these attributes */}
      <img
        src='/images/carousel-1.webp'
        srcSet='/images/carousel-1.webp 1200w, /images/carousel-1-720.webp 720w'
        sizes='(min-width: 1024px) 1200px, 100vw'
        alt='Hero'
        width='1200'
        height='700'
        loading='eager'
        fetchpriority='high'
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </StyledHero>
  )
}
