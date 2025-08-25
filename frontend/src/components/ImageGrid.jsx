import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { media } from '../styles/media'
import useProductStore from '../stores/useProductStore'

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
    grid-template-rows: repeat(2, 4fr);
    grid-template-areas:
      'div1 div2 div3'
      'div4 div5 div6';
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    width: 100%;
  }

  ${media.lg} {
    grid-template-columns: 2fr 2fr 3fr;
    grid-template-rows: repeat(2, 6fr);
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
  opacity: 1; // always visible, change to 0.7 or add hover effect if you want
  pointer-events: none;
  border-radius: 0; // match your image style if needed
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
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
`

export const ImageGrid = () => {
  const [selectedIdx, setSelectedIdx] = useState(null)
  const products = useProductStore((state) => state.products)

  const productImages = products.map((p) => p.images?.[0]) // <-- ADD THIS LINE

  const handleImageClick = (idx) => setSelectedIdx(idx)
  const handleClose = () => setSelectedIdx(null)

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
                  src={productImages[idx]}
                  alt={products?.[idx]?.name || `Product ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <ImageOverlay />
              </ImageWrapper>
            ) : idx === 5 ? (
              <ImageWrapper>
                <img
                  src='/images/limited.webp'
                  alt='Limited Edition Treats'
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <ImageOverlay />
              </ImageWrapper>
            ) : null}
          </Div>
        ))}
      </StyledImageGrid>
      {selectedIdx !== null && products?.[selectedIdx] && (
        <InfoOverlay onClick={handleClose}>
          <InfoBox onClick={(e) => e.stopPropagation()}>
            <h2>{products[selectedIdx].name}</h2>
            <p>{products[selectedIdx].description}</p>
            {products[selectedIdx].price && (
              <p>
                <strong>Price:</strong> ${products[selectedIdx].price}
              </p>
            )}
            <button onClick={handleClose}>Close</button>
          </InfoBox>
        </InfoOverlay>
      )}
    </>
  )
}
