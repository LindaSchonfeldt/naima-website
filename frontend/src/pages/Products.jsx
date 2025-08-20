import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import styled from 'styled-components'

import { Image } from '../components/Image'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'

const StyledProducts = styled.section`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  text-align: left;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${(props) => props.theme.spacing.md};
`

const ProductCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  margin-bottom: ${(props) => props.theme.spacing.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* Do NOT set width here */
`

const Products = ({ products = [] }) => (
  <PageContainer>
    <StyledProducts>
      <PageTitle>Fika Selection</PageTitle>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 700: 2, 900: 3 }}>
        <Masonry gutter='24px'>
          {products.map((product) => (
            <ProductCard key={product._id}>
              <Image src={product.image} alt={product.name} />
              {/* Add product info here */}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              {/* etc */}
            </ProductCard>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </StyledProducts>
  </PageContainer>
)

export default Products
