import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { media } from '../styles/media'

const CarouselContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-${(props) => props.$currentSlide * 100}%);
  height: 100%;
`

const CarouselItem = styled.div`
  min-width: 100%;
  position: relative;
  height: 100%;

  ${media.md} {
    min-width: ${(props) =>
      props.$slidesToShow ? `${100 / props.$slidesToShow}%` : '100%'};
  }
`

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

const CarouselText = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 2rem 1rem 1rem;
  font-weight: 500;
`

const Navigation = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  z-index: 10;

  &:hover {
    background: white;
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`

const Indicators = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 10;
`

const Indicator = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  background: ${(props) => (props.$active ? '#333' : '#ccc')};

  &:hover {
    background: #666;
  }
`

export const Carousel = ({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  showIndicators = true,
  slidesToShow = 1
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const maxSlides = Math.ceil(items.length / slidesToShow)

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % maxSlides)
      }, autoPlayInterval)

      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, maxSlides])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  if (!items || items.length === 0) {
    return <div>No items to display</div>
  }

  return (
    <CarouselContainer>
      <CarouselTrack $currentSlide={currentSlide}>
        {items.map((item, index) => (
          <CarouselItem key={item.id || index} $slidesToShow={slidesToShow}>
            <CarouselImage src={item.image} alt={item.alt} />
            {item.text && <CarouselText>{item.text}</CarouselText>}
          </CarouselItem>
        ))}
      </CarouselTrack>

      {showArrows && items.length > 1 && (
        <>
          <Navigation className='prev' onClick={prevSlide}>
            ‹
          </Navigation>
          <Navigation className='next' onClick={nextSlide}>
            ›
          </Navigation>
        </>
      )}

      {showIndicators && items.length > 1 && (
        <Indicators>
          {Array.from({ length: maxSlides }).map((_, index) => (
            <Indicator
              key={index}
              $active={index === currentSlide}
              onClick={() => goToSlide(index)}
            />
          ))}
        </Indicators>
      )}
    </CarouselContainer>
  )
}
