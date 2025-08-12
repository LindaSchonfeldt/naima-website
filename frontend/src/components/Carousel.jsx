import { useState, useEffect, useCallback, useMemo } from 'react'
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
// Uses its own internal (local) state, independent on Zustand stores
export const Carousel = ({
  items = [],
  autoPlay = false,
  autoPlayInterval = 3000,
  showArrows = true,
  showIndicators = true,
  slidesToShow = 1
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // ✅ Memoize items to prevent unnecessary re-renders
  const memoizedItems = useMemo(() => items, [items])

  // ✅ Memoize navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % memoizedItems.length)
  }, [memoizedItems.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev === 0 ? memoizedItems.length - 1 : prev - 1
    )
  }, [memoizedItems.length])

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index)
  }, [])

  // ✅ Optimize autoplay effect
  useEffect(() => {
    if (!autoPlay || memoizedItems.length <= 1) return

    const interval = setInterval(nextSlide, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, nextSlide, memoizedItems.length])

  // ✅ Early return if no items
  if (!memoizedItems || memoizedItems.length === 0) {
    return <div>Loading carousel...</div>
  }

  return (
    <CarouselContainer>
      <CarouselTrack $currentSlide={currentSlide}>
        {memoizedItems.map((item, index) => (
          <CarouselItem key={item.id || index} $slidesToShow={slidesToShow}>
            <CarouselImage
              src={item.image}
              alt={item.alt}
              loading={index === 0 ? 'eager' : 'lazy'} // ✅ Load first image immediately
              onError={(e) => {
                console.warn('Carousel image failed to load:', e.target.src)
                e.target.style.display = 'none'
              }}
            />
            {item.text && <CarouselText>{item.text}</CarouselText>}
          </CarouselItem>
        ))}
      </CarouselTrack>

      {showArrows && memoizedItems.length > 1 && (
        <>
          <Navigation className='prev' onClick={prevSlide}>
            ‹
          </Navigation>
          <Navigation className='next' onClick={nextSlide}>
            ›
          </Navigation>
        </>
      )}

      {showIndicators && memoizedItems.length > 1 && (
        <Indicators>
          {memoizedItems.map((_, index) => (
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
