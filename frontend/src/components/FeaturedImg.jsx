import styled from 'styled-components'

const StyledFeaturedImg = styled.div`
  position: relative; // Add this!
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const FeaturedImg = ({ product }) => {
  const getProductImage = (product) => {
    if (product.primaryImage?.url) return product.primaryImage.url
    if (product.images?.[0]?.url) return product.images[0].url
    return '/images/placeholder.png'
  }

  const getImageAlt = (product) => {
    if (product.primaryImage?.alt) return product.primaryImage.alt
    if (product.images?.[0]?.alt) return product.images[0].alt
    return product.name
  }

  const imageSrc = getProductImage(product)
  const imageAlt = getImageAlt(product)

  return (
    <StyledFeaturedImg>
      <ProductImage src={imageSrc} alt={imageAlt} />
      <ImageOverlay>
        <h3 style={{ margin: 0 }}>{product.name}</h3>
        <p style={{ margin: 0 }}>{product.info || product.description}</p>
      </ImageOverlay>
    </StyledFeaturedImg>
  )
}
