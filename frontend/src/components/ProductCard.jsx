import styled from 'styled-components'
import { media } from '../styles/media'

import { Button } from './Button'

const StyledProductCard = styled.div`
  text-align: left;
  position: relative;
  overflow: hidden;

  &:hover {
    /* Show button on hover */
    .hover-button {
      opacity: 1;
      transform: translateX(-50%) translateY(0) !important;
    }
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`

const ProductContent = styled.div`
  padding: ${(props) => props.theme.spacing.sm};

  ${media.md} {
    padding: ${(props) => props.theme.spacing.md};
  }
`

const ProductTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  color: ${(props) => props.theme.colors.text.primary};

  ${media.md} {
    font-size: 28px;
    margin: 0 0 ${(props) => props.theme.spacing.md} 0;
  }
`

const ProductInformation = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`

const ProductDescription = styled.p`
  margin-bottom: ${(props) => props.theme.spacing.sm};
  line-height: 1.5;
`

const ProductPrice = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.md};
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: ${(props) => props.theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - ${(props) => props.theme.spacing.lg});
  z-index: 2;
`

export const ProductCard = ({ product, onOrder }) => {
  if (!product) {
    return <div>No product data</div>
  }

  const getProductImage = () => {
    if (product.primaryImage?.url) return product.primaryImage.url
    if (product.images?.[0]?.url) return product.images[0].url
    return '/images/placeholder.png'
  }

  const getImageAlt = () => {
    if (product.primaryImage?.alt) return product.primaryImage.alt
    if (product.images?.[0]?.alt) return product.images[0].alt
    return product.name
  }

  return (
    <StyledProductCard>
      <ProductImage
        src={getProductImage()}
        alt={getImageAlt()}
        loading='lazy'
        onError={(e) => {
          console.log('Image failed to load:', e.target.src)
          e.target.src = '/images/placeholder.jpg'
        }}
      />
      <ProductContent>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductInformation>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>
            {product.formattedPrice || `$${product.price}`}
          </ProductPrice>
        </ProductInformation>
      </ProductContent>

      {/* ✅ Use Button component with hover variant and positioning container */}
      <ButtonContainer>
        <Button
          variant='hover'
          className='hover-button'
          onClick={() => onOrder(product)}
        >
          Order Now
        </Button>
      </ButtonContainer>
    </StyledProductCard>
  )
}
