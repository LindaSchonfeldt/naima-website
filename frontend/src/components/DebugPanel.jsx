import { useEffect } from 'react'
import useProductStore from '../stores/useProductStore'
import usePartnerStore from '../stores/usePartnerStore'

export const DebugPanel = () => {
  const {
    featuredProducts,
    loading: productLoading,
    error: productError,
    fetchFeaturedProducts
  } = useProductStore()
  const {
    servedAtPartners,
    loading: partnerLoading,
    error: partnerError,
    fetchServedAtPartners
  } = usePartnerStore()

  useEffect(() => {
    console.log('🔍 Debug Panel: Fetching data...')
    fetchFeaturedProducts()
    fetchServedAtPartners()
  }, [])

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', margin: '20px' }}>
      <h3>Debug Panel</h3>

      <div>
        <h4>Featured Products:</h4>
        <p>Loading: {productLoading ? 'Yes' : 'No'}</p>
        <p>Error: {productError || 'None'}</p>
        <p>Count: {featuredProducts.length}</p>
        <pre>{JSON.stringify(featuredProducts, null, 2)}</pre>
      </div>

      <div>
        <h4>Served At Partners:</h4>
        <p>Loading: {partnerLoading ? 'Yes' : 'No'}</p>
        <p>Error: {partnerError || 'None'}</p>
        <p>Count: {servedAtPartners.length}</p>
        <pre>{JSON.stringify(servedAtPartners, null, 2)}</pre>
      </div>
    </div>
  )
}
