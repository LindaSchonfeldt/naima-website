import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import { useOrderStore } from '../stores/useOrderStore'
import { OrderDetails } from '../components/OrderDetails'

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

  return <OrderDetails order={order} />
}

export default CompanyOrderDetails
