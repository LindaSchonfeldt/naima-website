import styled from 'styled-components'

import { Carousel } from '../components/Carousel'
import { homeCarouselItems } from '../data/carouselData'
import theme from '../styles/theme'

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem;
`

const StyledH1 = styled.h1`
  position: absolute;
  font-size: 4rem;
  color: ${(props) =>
    props.hero ? '#ffffff' : props.theme.colors.text.primary};
  text-align: left;
  z-index: 10;
  left: 2rem;
  top: 50%;
  transform: translateY(-50%);
  font-family: ${(props) => props.theme.fonts.primary};
  font-weight: ${(props) => props.theme.fonts.weights.bold};
`

const CursiveText = styled.span`
  font-style: italic;
`

const Home = () => {
  return (
    <HeroSection>
      <Carousel
        items={homeCarouselItems}
        autoPlay={true}
        autoPlayInterval={5000}
        showArrows={true}
        showIndicators={true}
        slidesToShow={1}
      />
      <StyledH1 hero>
        Fika with <CursiveText>benefits</CursiveText>
      </StyledH1>
    </HeroSection>
  )
}

export default Home
