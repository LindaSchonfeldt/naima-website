import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { OrderDetails } from '../components/OrderDetails'

export default function OrderDetailsPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // Fetch order from API
    fetch(`/api/orders/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
  }, [orderId])

  if (!order) return <div>Loading...</div>
  return <OrderDetails order={order} />
}
