import { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import styled from 'styled-components'

import useProductStore from '../stores/useProductStore'
import { media } from '../styles/media'
import { Button } from './Button'
import { Link } from 'react-router-dom'

const StyledImageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 200px);
  grid-template-areas:
    'div1'
    'div2'
    'div3'
    'div4'
    'div5'
    'div6';
  grid-gap: 10px;
  width: 100%;

  ${media.sm} {
    grid-template-columns: 2fr 1fr; // First column is wider
    grid-template-rows: repeat(2, 200px);
    grid-template-areas:
      'div1 div2'
      'div3 div4'
      'div5 div6';
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    width: 100%;
    min-height: 600px;
  }

  ${media.md} {
    grid-template-columns: 2fr 2fr 3fr;
    grid-template-rows: repeat(2, 300px);
    grid-template-areas:
      'div1 div2 div3'
      'div4 div5 div6';
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    width: 100%;
  }

  ${media.lg} {
    grid-template-columns: 2fr 2fr 3fr;
    grid-template-rows: repeat(2, 400px);
    grid-template-areas:
      'div1 div2 div3'
      'div4 div5 div6';
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    width: 100%;
    min-height: 600px; // Optional: increase overall grid height
  }
`

const Div1 = styled.div`
  grid-area: div1;
  background: ${({ theme }) => `rgba(208, 195, 241, 0.5)`};
`
const Div2 = styled.div`
  grid-area: div2;
  background: ${({ theme }) => `rgba(208, 195, 241, 0.5)`};
`
const Div3 = styled.div`
  grid-area: div3;
  background: ${({ theme }) => `rgba(208, 195, 241, 0.5)`};
`
const Div4 = styled.div`
  grid-area: div4;
  background: ${({ theme }) => `rgba(208, 195, 241, 0.5)`};
`
const Div5 = styled.div`
  grid-area: div5;
  background: ${({ theme }) => `rgba(208, 195, 241, 0.5)`};
`
const Div6 = styled.div`
  grid-area: div6;
  background: ${({ theme }) => `rgba(208, 195, 241, 0.5)`};
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => `rgba(208, 195, 241, 0.2)`};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  opacity: 0.7; // always visible, change to 0.7 or add hover effect if you want
  pointer-events: none;
  border-radius: 0; // match your image style if needed
`

const LimitedImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  span {
    color: #fff;
    font-weight: 700;
    font-size: 2rem;
    margin: auto;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
`

const InfoOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`

const InfoBox = styled.div`
  background: #fff;
  padding: 1.6rem;
  border-radius: 4px;
  max-width: 500px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.2);
  text-align: left;
  position: relative;
  opacity: 0.95;
`

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  cursor: pointer;
  z-index: 10;
`

const CloseButton = styled(IoCloseOutline)`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  h2 {
    margin: 0;
    font-size: 1.5rem;
  }

  ${media.md} {
    h2 {
      font-size: 1.8rem;
    }
    margin-bottom: 1.5rem;
  }
`

const Ingredients = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;

  strong {
    font-weight: 600;
  }

  ul {
    padding-left: 1.2rem;
    margin: 0.5rem 0 0 0;
  }

  li {
    margin-bottom: 0.3rem;
  }
`

export const ImageGrid = () => {
  const [selectedIdx, setSelectedIdx] = useState(null)
  const products = useProductStore((state) => state.products)

  const productImages = products.map((p) => p.images?.[0]) // Get first image of each product

  const handleImageClick = (idx) => setSelectedIdx(idx)
  const handleClose = () => setSelectedIdx(null)

  console.log('products:', products)
  console.log('productImages:', productImages)

  return (
    <>
      <StyledImageGrid>
        {[Div1, Div2, Div3, Div4, Div5, Div6].map((Div, idx) => (
          <Div key={idx}>
            {productImages?.[idx] ? (
              <ImageWrapper
                onClick={() => handleImageClick(idx)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={productImages[idx]?.url}
                  alt={
                    productImages[idx]?.alt ||
                    products?.[idx]?.name ||
                    `Product ${idx + 1}`
                  }
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <ImageOverlay />
              </ImageWrapper>
            ) : idx === 5 ? (
              <ImageWrapper
                onClick={() => handleImageClick(idx)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src='/images/limited.webp'
                  alt='Limited Edition Treats'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <ImageOverlay />
                <LimitedImageOverlay>
                  <span>Limited edition</span>
                </LimitedImageOverlay>
              </ImageWrapper>
            ) : null}
          </Div>
        ))}
      </StyledImageGrid>
      {selectedIdx !== null &&
        (selectedIdx === 5 ? (
          <InfoOverlay onClick={handleClose}>
            <InfoBox onClick={(e) => e.stopPropagation()}>
              <CloseButtonWrapper>
                <Button
                  variant='icon'
                  size='small'
                  onClick={handleClose}
                  aria-label='Close info overlay'
                >
                  <CloseButton size={32} />
                </Button>
              </CloseButtonWrapper>
              <Header>
                <h2>Limited Edition Treats</h2>
              </Header>
              <p>
                Straciatella & Coal / Matcha & Lime / Semla / Chocolate &
                Saffron / Lingonberry & Gingerbread and more variants depending
                on season and collaboration.{' '}
                <Link
                  to='/contact'
                  style={{ color: '#1976d2', fontWeight: 600 }}
                >
                  Contact us
                </Link>{' '}
                for more information.
              </p>
              <Ingredients>
                <div>
                  <strong>Ingredients:</strong> Varies by variant - contact for
                  specific information.
                </div>
              </Ingredients>
            </InfoBox>
          </InfoOverlay>
        ) : (
          products[selectedIdx] && (
            <InfoOverlay onClick={handleClose}>
              <InfoBox onClick={(e) => e.stopPropagation()}>
                <CloseButtonWrapper>
                  <Button
                    variant='icon'
                    size='small'
                    onClick={handleClose}
                    aria-label='Close info overlay'
                  >
                    <CloseButton size={32} />
                  </Button>
                </CloseButtonWrapper>
                <Header>
                  <h2>{products[selectedIdx].name}</h2>
                </Header>
                <p>{products[selectedIdx].description}</p>
                <Ingredients>
                  {Array.isArray(products[selectedIdx].ingredients) && (
                    <div>
                      <strong>Ingredients:</strong>{' '}
                      {products[selectedIdx].ingredients.join(', ')}
                    </div>
                  )}
                </Ingredients>
              </InfoBox>
            </InfoOverlay>
          )
        ))}
    </>
  )
}
