import styled from 'styled-components'

import { Button } from './Button'

const StyledProductCard = styled.div`
  text-align: left;
  position: relative;
  overflow: hidden;

  &:hover {
    /* Show button on hover */
    .hover-button {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const ProductImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`

const ProductContent = styled.div``

const ProductTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  color: ${(props) => props.theme.colors.text.primary};
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

const HoverButton = styled(Button)`
  position: absolute;
  bottom: ${(props) => props.theme.spacing.md};
  left: 50%;
  transform: translateX(-50%) translateY(10px);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 2;
  width: calc(100% - ${(props) => props.theme.spacing.lg});
`

export const ProductCard = ({ product, onOrder }) => {
  if (!product) {
    return <div>No product data</div>
  }

  // ✅ Get image from the database structure
  const getProductImage = () => {
    if (product.primaryImage?.url) return product.primaryImage.url
    if (product.images?.[0]?.url) return product.images[0].url
    return '/images/placeholder.jpg' // Fallback
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
        onError={(e) => {
          e.target.src = '/images/placeholder.jpg' // Fallback if image fails
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

      <Button
        variant='hover'
        className='hover-button'
        onClick={() => onOrder(product)}
      >
        Order Now
      </Button>
    </StyledProductCard>
  )
}
