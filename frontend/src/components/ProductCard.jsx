import { useState } from 'react'
import styled from 'styled-components'

import { useCartStore } from '../stores/useCartStore'
import { useProductSelectionStore } from '../stores/useProductSelectionStore'
import { media } from '../styles/media'
import { Button } from './Button'
import { DropdownMenu } from './DropdownMenu'
import { Image } from './Image'
import { QuantitySelector } from './QuantitySelector'

const ProductImageWrapper = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
`

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  overflow: hidden;
  min-width: 0;
  height: 100%;
  padding-bottom: ${(props) => props.theme.spacing.md};
  }
`

const ProductContent = styled.div`
  padding: ${(props) => props.theme.spacing.sm};

  ${media.md} {
  }
`

const ProductTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  width: 100%;
  height: 2rem;
  overflow: hidden;

  ${media.sm} {
    height: 2rem;
  }

  ${media.md} {
    height: 2.9rem;
  }
`

const ProductTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  color: ${(props) => props.theme.colors.text.primary};

  ${media.sm} {
    font-size: 18px;
    margin: 0 0 ${(props) => props.theme.spacing.sm} 0;
  }

  ${media.md} {
    font-size: 20px;
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
`

const LowerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.sm};
  margin-top: auto; // ensures this section is at the bottom of the card
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-top: auto; // pushes the container to the bottom if you want
`

const StyledButton = styled(Button)`
  flex: 1;
  margin-left: ${(props) => props.theme.spacing.xs};
  color: ${(props) => props.theme.colors.text.primary};
`

export const ProductCard = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const selectedSize = useProductSelectionStore(
    (state) => state.selectedSizes[product._id]
  )
  const setSelectedSize = useProductSelectionStore(
    (state) => state.setSelectedSize
  )
  const cartItem = useCartStore((state) =>
    state.items.find(
      (i) =>
        i.productId === product._id && i.selectedSize?._id === selectedSize?._id
    )
  )
  const [desiredQuantity, setDesiredQuantity] = useState(1)

  if (!product) {
    return <div>No product data</div>
  }

  const getProductImage = () => {
    if (product.primaryImage?.url) return product.primaryImage.url
    if (product.images?.[0]?.url) return product.images[0].url
    return '/images/placeholder.png'
  }

  const getHoverImage = () => {
    if (product.images?.[1]?.url) return product.images[1].url
    return null
  }

  const getImageAlt = () => {
    if (product.primaryImage?.alt) return product.primaryImage.alt
    if (product.images?.[0]?.alt) return product.images[0].alt
    return product.name
  }

  const sizeOptions = product.sizes.map((size, idx) => ({
    label: `${size.packaging} (${size.weight}g)`,
    value: String(size._id || idx)
  }))

  const validPrices = product.sizes
    .map((s) => s.price)
    .filter((p) => typeof p === 'number' && p > 0)
  const lowestPrice =
    validPrices.length > 0 ? Math.min(...validPrices).toFixed(2) : 'N/A'

  return (
    <StyledProductCard>
      <ProductImageWrapper>
        <Image
          src={getProductImage()}
          hoverSrc={getHoverImage()}
          alt={getImageAlt()}
          loading='lazy'
          className='product-image'
        />
      </ProductImageWrapper>
      <ProductContent>
        <ProductTitleContainer>
          <ProductTitle>{product.name}</ProductTitle>
        </ProductTitleContainer>
        <ProductInformation>
          <ProductDescription>{product.description}</ProductDescription>
        </ProductInformation>
      </ProductContent>
      <LowerSection>
        <ProductPrice>
          {selectedSize?.price
            ? `$${selectedSize.price}`
            : `from $${lowestPrice}`}
        </ProductPrice>
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
          <QuantitySelector
            variant='card'
            item={{
              productId: product._id,
              name: product.name,
              selectedSize,
              price: selectedSize?.price || lowestPrice,
              images: product.images,
              cartKey: cartItem?.cartKey, // only if in cart
              quantity: desiredQuantity,
              setQuantity: setDesiredQuantity
            }}
          />
          <StyledButton
            variant='primary'
            onClick={() => {
              if (selectedSize) {
                addToCart(product, selectedSize, desiredQuantity)
              }
            }}
            disabled={!selectedSize}
          >
            Add to Cart
          </StyledButton>
        </ButtonContainer>
      </LowerSection>
    </StyledProductCard>
  )
}
