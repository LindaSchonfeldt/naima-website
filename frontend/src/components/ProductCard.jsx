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

const LowerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm};
  margin-top: auto; // ensures this section is at the bottom of the card
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

  const sizeOptions = product.sizes.map((size, idx) => ({
    label: `${size.packaging} (${size.weight}g)`,
    value: String(size._id || idx) // fallback to index if _id is missing
  }))

  const validPrices = product.sizes
    .map((s) => s.price)
    .filter((p) => typeof p === 'number' && p > 0)
  const lowestPrice =
    validPrices.length > 0 ? Math.min(...validPrices).toFixed(2) : 'N/A'

  const sizeId = selectedSize
    ? String(selectedSize._id || product.sizes.findIndex((s) => s === selectedSize))
    : ''

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
              : `from $${lowestPrice}`}
          </ProductPrice>
        </ProductInformation>
      </ProductContent>
      <LowerSection>
        <DropdownMenu
          options={[{ label: 'Select size...', value: '' }, ...sizeOptions]}
          value={
            selectedSize
              ? String(
                  selectedSize._id ||
                    product.sizes.findIndex((s) => s === selectedSize)
                )
              : ''
          }
          onChange={(val) => {
            const size = product.sizes.find(
              (s, idx) => String(s._id || idx) === val
            )
            setSelectedSize(product._id, size || null)
          }}
        />
        <ButtonContainer>
          <Button
            variant='primary'
            onClick={() => {
              if (selectedSize) {
                addToCart(product, selectedSize)
              }
            }}
            disabled={!selectedSize}
          >
            Add to Cart
          </Button>
        </ButtonContainer>
      </LowerSection>
    </StyledProductCard>
  )
}
