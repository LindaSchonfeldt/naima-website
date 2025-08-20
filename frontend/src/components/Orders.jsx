import { useEffect, useState } from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

export const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const token = useAuthStore((state) => state.companyToken)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/company/login')
    }
  }, [isLoggedIn, navigate])

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await api.get('/orders/company', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setOrders(data)
      } catch (err) {
        setError('Failed to fetch orders')
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [token])

  if (loading) return <div>Loading orders...</div>
  if (error) return <div style={{ color: 'red' }}>{error}</div>
  if (!orders.length) return <div>No orders found.</div>

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order #{order._id} - {order.totalCost} SEK
          </li>
        ))}
      </ul>
    </div>
  )
}
