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

  // defensive: ensure orders is an array before reading .length / mapping
  const getTimestamp = (o) => {
    if (!o) return 0
    if (o.createdAt) return new Date(o.createdAt).getTime()
    if (o._id && typeof o._id === 'string' && o._id.length >= 8) {
      // ObjectId first 8 chars are Unix seconds in hex
      return parseInt(o._id.slice(0, 8), 16) * 1000
    }
    return 0
  }

  const list = Array.isArray(orders)
    ? [...orders].sort((a, b) => getTimestamp(b) - getTimestamp(a))
    : []

  if (loading) return <div>Loading orders...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!list.length) return <div>No orders found.</div>

  return (
    <section>
      <ul>
        {list.map((order) => (
          <OrderItem key={order._id} order={order} onClick={handleOrderClick} />
        ))}
      </ul>
    </section>
  )
}
