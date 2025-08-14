import styled from 'styled-components'

import { useCartStore } from '../stores/useCartStore'

const StyledQuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  button {
    background: none;
    color: ${(props) => props.theme.colors.text.primary};
    border: none;
    padding: ${(props) => props.theme.spacing.xs};
    border-radius: 4px;
    cursor: pointer;
  }

  span {
    font-size: 1rem;
    color: ${(props) => props.theme.colors.text.primary};
  }
`
export const QuantitySelector = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  if (!item) return null // Prevent errors if item is undefined

  return (
    <StyledQuantitySelector>
      <button
        onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
        disabled={item.quantity <= 1}
      >
        –
      </button>
      <span>{item.quantity || 1}</span>
      <button
        onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
      >
        +
      </button>
    </StyledQuantitySelector>
  )
}
