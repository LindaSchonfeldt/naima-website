import styled from 'styled-components'

import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import masonryImages from '../data/masonryImages'
import { ImageGrid } from '../components/ImageGrid'

const Products = () => (
  <PageContainer>
    <PageTitle>Fika selection</PageTitle>
    <ImageGrid images={masonryImages}></ImageGrid>
  </PageContainer>
)

export default Products
