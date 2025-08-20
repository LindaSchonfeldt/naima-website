import styled, { css } from 'styled-components'

import { useCartStore } from '../stores/useCartStore'

const StyledQuantitySelector = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  gap: 8px;

  button {
    background: none;
    color: ${(props) => props.theme.colors.text.primary};
    cursor: pointer;
    ${(props) =>
      props.variant === 'card' &&
      css`
        font-size: 1.5rem;
        padding: ${(props) => props.theme.spacing.sm}
          ${(props) => props.theme.spacing.sm};
      `}
    ${(props) =>
      props.variant === 'cart' &&
      css`
        border: 1px solid black;
        border-radius: 4px;
        background: #fff;
        font-size: 1rem;
        padding: ${(props) => props.theme.spacing.xs}
          ${(props) => props.theme.spacing.sm};
      `}
  }

  span {
    font-size: 1rem;
    font-family: 'Neuzeit S LT Std Medium', sans-serif;
    color: ${(props) => props.theme.colors.text.primary};
    padding: ${(props) => props.theme.spacing.sm}
      ${(props) => props.theme.spacing.xs};
    ${(props) =>
      props.variant === 'card' &&
      css`
        font-size: 1.2rem;
      `}
    ${(props) =>
      props.variant === 'cart' &&
      css`
        font-size: 1rem;
      `}
  }
`

export const QuantitySelector = ({ item, variant = 'cart' }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity)

  if (!item) return null // Prevent errors if item is undefined

  return (
    <StyledQuantitySelector variant={variant}>
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
