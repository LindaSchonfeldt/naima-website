import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import MotionReveal from '../components/MotionReveal'
import { OrderDetails } from '../components/OrderDetails'
import { PageContainer } from '../components/PageContainer'
import { useAuthStore } from '../stores/useAuthStore'
import { useOrderStore } from '../stores/useOrderStore'

export const CompanyOrderDetails = () => {
  const { orderId } = useParams()
  const token = useAuthStore((s) => s.companyToken)
  const { order, loading, error, fetchOrderById, setOrder } = useOrderStore()

  useEffect(() => {
    if (!orderId) return
    if (!token) {
      setOrder(null)
      return
    }
    fetchOrderById(orderId, token)
    return () => setOrder(null)
  }, [orderId, token, fetchOrderById, setOrder])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!order) return <div>No order found.</div>

  return (
    <MotionReveal>
      <PageContainer>
        <OrderDetails order={order} />
      </PageContainer>
    </MotionReveal>
  )
}

export default CompanyOrderDetails
