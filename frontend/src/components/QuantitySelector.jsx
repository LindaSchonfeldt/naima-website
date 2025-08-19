import styled from 'styled-components'

import { useCartStore } from '../stores/useCartStore'

const StyledQuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    background: none;
    color: ${(props) => props.theme.colors.text.primary};
    border: 1px solid black;
    padding: ${(props) => props.theme.spacing.xs}
      ${(props) => props.theme.spacing.sm};
    border-radius: 4px;
    cursor: pointer;
  }

  span {
    font-size: 1rem;
    font-family: 'Neuzeit S LT Std Medium', sans-serif;
    color: ${(props) => props.theme.colors.text.primary};
  }
`
export const QuantitySelector = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  if (!item) return null // Prevent errors if item is undefined

  return (
    <StyledQuantitySelector>
      <button
        onClick={() => updateQuantity(item.cartKey, (item.quantity || 1) - 1)}
        disabled={item.quantity <= 1}
      >
        -
      </button>
      <span>{item.quantity}</span>
      <button
        onClick={() => updateQuantity(item.cartKey, (item.quantity || 1) + 1)}
      >
        +
      </button>
    </StyledQuantitySelector>
  )
}
