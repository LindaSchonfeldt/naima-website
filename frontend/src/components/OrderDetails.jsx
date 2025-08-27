import styled from 'styled-components'

const StyledOrderDetails = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.07);
  padding: ${(props) => props.theme.spacing.lg};
  margin: ${(props) => props.theme.spacing.lg} auto;
  max-width: 600px;
  width: 100%;
  color: ${(props) => props.theme.colors.text.primary};

  h2 {
    margin-bottom: ${(props) => props.theme.spacing.md};
  }
  .order-info {
    margin-bottom: ${(props) => props.theme.spacing.md};
    font-size: 1.1rem;
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
      <div>Total: {order.totalCost} SEK</div>
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
