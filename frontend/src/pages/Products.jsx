import { useEffect } from 'react'

import { ImageGrid } from '../components/ImageGrid'
import { PageContainer } from '../components/PageContainer'
import PageFade from '../components/PageFade'
import { PageTitle } from '../components/PageTitle'
import CateringPartners  from '../sections/CateringPartners'
import useProductStore from '../stores/useProductStore'

const Products = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const products = useProductStore((state) => state.products)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const productImages = products.map((p) => p.images?.[0])

  return (
    <PageFade>
      <PageContainer>
        <PageTitle>fika selection</PageTitle>
        <ImageGrid images={productImages} products={products} />
        <CateringPartners />
      </PageContainer>
    </PageFade>
  )
}

export default Products
