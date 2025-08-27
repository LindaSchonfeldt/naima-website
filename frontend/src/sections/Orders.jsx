import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { OrderItem } from '../components/OrderItem'
import { useAuthStore } from '../stores/useAuthStore'
import { useOrderStore } from '../stores/useOrderStore'

export const Orders = () => {
  const { orders, loading, error, fetchOrders } = useOrderStore()
  const token = useAuthStore((state) => state.companyToken)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/company/login')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    if (token) fetchOrders(token)
  }, [token, fetchOrders])

  const handleOrderClick = (orderId) => {
    navigate(`/orders/${orderId}`)
  }

  if (loading) return <div>Loading orders...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!orders.length) return <div>No orders found.</div>

  return (
    <section>
      <ul>
        {orders.map((order) => (
          <OrderItem key={order._id} order={order} onClick={handleOrderClick} />
        ))}
      </ul>
    </section>
  )
}
