import styled from 'styled-components'

import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import masonryImages from '../data/masonryImages'
import { ImageMasonry } from '../sections/ImageMasonry'

const Products = () => (
  <PageContainer>
    <PageTitle>Fika Selection</PageTitle>
    <ImageMasonry masonryImages={masonryImages} />
  </PageContainer>
)

export default Products
