import styled from 'styled-components'

const StyledProductCard = styled.div`
  text-align: left;
`

const ProductImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
`

const ProductTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin: ${(props) => props.theme.spacing.sm} 0;
  color: ${(props) => props.theme.colors.text.primary};
`
const ProductInformation = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.spacing.md};
`

const ProductDescription = styled.p``

const ProductPrice = styled.span`
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`

export const ProductCard = ({ product }) => {
  return (
    <StyledProductCard>
      <ProductImage src={product.image} alt={product.name} />
      <ProductTitle>{product.name}</ProductTitle>
      <ProductInformation>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>${product.price}</ProductPrice>
      </ProductInformation>
    </StyledProductCard>
  )
}
