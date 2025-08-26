import { useEffect } from 'react'

import { ImageGrid } from '../components/ImageGrid'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import useProductStore from '../stores/useProductStore'

const Products = () => {
  const fetchProducts = useProductStore((state) => state.fetchProducts)
  const products = useProductStore((state) => state.products)

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const productImages = products.map((p) => p.images?.[0])

  return (
    <PageContainer>
      <PageTitle>fika selection</PageTitle>
      <ImageGrid images={productImages} products={products} />
    </PageContainer>
  )
}

export default Products
