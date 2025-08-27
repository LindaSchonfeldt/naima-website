import { useCallback, useEffect, useMemo, useState } from 'react'
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
  width: 48px;
  height: 48px;
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
   /* Big tappable area for a11y */
   --tap: 48px;
   inline-size: var(--tap);
   block-size: var(--tap);
   padding: 0;
   border: 0;
   border-radius: 999px;
   background: transparent;
   position: relative;
   cursor: pointer;

   /* Small visual dot centered inside */
   &::before {
     content: '';
     inline-size: 14px;
     block-size: 14px;
     border-radius: 50%;
     position: absolute;
     inset: 0;
     margin: auto;
     background: ${({ $active, theme }) =>
       $active ? theme.colors.brand.salmon : theme.colors.surface};
     transition: background-color .2s ease;
     box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.border} inset;
   }

   &:hover::before { background: ${({ theme }) => theme.colors.brand.lavender}; }
   
   &:focus-visible {
     outline: 2px solid ${({ theme }) => theme.colors.brand.salmon};
     outline-offset: 2px;
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
  const slideId = (i) => `hero-slide-${i}`

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

  // Keyboard support
  const onKeyDown = useCallback((e) => {
      if (e.key === 'ArrowRight') nextSlide()
      else if (e.key === 'ArrowLeft') prevSlide()
      else if (e.key === 'Home') goToSlide(0)
      else if (e.key === 'End') goToSlide(memoizedItems.length - 1)
   }, [nextSlide, prevSlide, goToSlide, memoizedItems.length])

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
    <CarouselContainer
      role="region"
      aria-roledescription="carousel"
      aria-label="Hero carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <CarouselTrack $currentSlide={currentSlide}>
        {memoizedItems.map((item, index) => (
          <CarouselItem
            key={item.id || index}
            $slidesToShow={slidesToShow}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${memoizedItems.length}`}
            aria-hidden={index !== currentSlide}
            id={slideId(index)}
          >
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
          <Navigation className='prev' onClick={prevSlide} aria-label="Previous slide" type="button">
            ‹
          </Navigation>
          <Navigation className='next' onClick={nextSlide} aria-label="Next slide" type="button">
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
              type="button"
              aria-label={`Go to slide ${index + 1} of ${memoizedItems.length}`}
              aria-controls={slideId(index)}
              aria-current={index === currentSlide ? 'true' : undefined}
             />
          ))}
        </Indicators>
      )}
    </CarouselContainer>
  )
}
