import { IoIosArrowForward } from 'react-icons/io'
import styled from 'styled-components'

const StyledOrderItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing.sm};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${(props) => props.theme.colors.backgroundHover || '#f5f5f5'};
  }
`

const ArrowIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: auto;
  color: ${(props) => props.theme.colors.text.primary};
  transition: color 0.2s;
`

export const OrderItem = ({ order, onClick }) => (
  <StyledOrderItem onClick={() => onClick(order._id)}>
    <div>
      <strong>Order #{order._id}</strong>
      <div>Date: {new Date(order.createdAt).toLocaleDateString()}</div>
      <div>Status: {order.status}</div>
      <div>Total: ${order.totalCost}</div>
    </div>
    <ArrowIcon>
      <IoIosArrowForward />
    </ArrowIcon>
  </StyledOrderItem>
)
