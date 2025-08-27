import styled from 'styled-components'
import { media } from '../styles/media'

const StyledOrderDetails = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: ${(props) => props.theme.spacing.md};
  margin: ${(props) => props.theme.spacing.lg} auto;
  max-width: 600px;
  width: 100%;
  color: ${(props) => props.theme.colors.text.primary};

  ${media.md} {
    padding: ${(props) => props.theme.spacing.lg};
  }

  h2 {
    font-size: 18px;
    flex-wrap: wrap;
    margin-bottom: ${(props) => props.theme.spacing.md};

    ${media.md} {
      font-size: 1.5rem;
    }
  }

  .order-info {
    font-size: 16px;
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  .order-items {
    margin-top: ${(props) => props.theme.spacing.md};
    border-top: 1px solid ${(props) => props.theme.colors.border};
    padding-top: ${(props) => props.theme.spacing.md};
  }

  .order-item-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: ${(props) => props.theme.spacing.sm};
  }
`

export const OrderDetails = ({ order }) => (
  <StyledOrderDetails>
    <h2>Order #{order._id}</h2>
    <div className='order-info'>
      <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
      <div>Status: {order.status}</div>
      <div>Total: ${order.totalCost}</div>
      <div>
        Customer: {order.name} ({order.email})
      </div>
      <div>Address: {order.address}</div>
      <div>Phone: {order.phone}</div>
      {/* Add more info as needed */}
    </div>
    <div className='order-items'>
      <h3>Items</h3>
      {order.items.map((item, idx) => (
        <div className='order-item-row' key={idx}>
          <span>
            {item.name} x {item.quantity}
          </span>
          <span>${item.price}</span>
        </div>
      ))}
    </div>
  </StyledOrderDetails>
)
