import styled, { css } from 'styled-components'

import { useCartStore } from '../stores/useCartStore'
import { useProductSelectionStore } from '../stores/useProductSelectionStore'
import { media } from '../styles/media'
import { Button } from './Button'
import { DropdownMenu } from './DropdownMenu'

const StyledProductCard = styled.div`
  text-align: left;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: ${(props) => props.theme.spacing.md};
  ${({ $variant }) => $variant === 'featured' && css``}
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
  margin-bottom: ${(props) => props.theme.spacing.sm};
`

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: auto; // pushes the button to the bottom if you want
  display: flex;
  justify-content: flex-start;
`

export const ProductCard = ({ product, onOrder, variant }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const selectedSize = useProductSelectionStore(
    (state) => state.selectedSizes[product._id]
  )
  const setSelectedSize = useProductSelectionStore(
    (state) => state.setSelectedSize
  )

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

  const sizeOptions = product.sizes.map((size) => ({
    label: `${size.packaging} (${size.weight}g)`,
    value: size._id || size.id
  }))

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
            {selectedSize?.price
              ? `$${selectedSize.price}`
              : product.formattedPrice || `$${product.price}`}
          </ProductPrice>
        </ProductInformation>
      </ProductContent>
      <DropdownMenu
        options={sizeOptions}
        value={selectedSize?._id || selectedSize?.id}
        onChange={(val) => {
          const size = product.sizes.find((s) => (s._id || s.id) === val)
          setSelectedSize(product._id, size)
        }}
      />
      <ButtonContainer>
        <Button
          variant='primary'
          onClick={() =>
            addToCart({ ...product, selectedSize, price: selectedSize.price })
          }
        >
          Add to Cart
        </Button>
      </ButtonContainer>
    </StyledProductCard>
  )
}
