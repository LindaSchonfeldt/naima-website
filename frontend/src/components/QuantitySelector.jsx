import styled, { css } from 'styled-components'

import { useCartStore } from '../stores/useCartStore'

const StyledQuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  flex: 1;

  button,
  span {
    flex: 1 1 0;
  }

  button {
    background: none;
    color: ${(props) => props.theme.colors.text.primary};
    cursor: pointer;
    ${(props) =>
      props.$variant === 'card' &&
      css`
        font-size: 1.5rem;
        padding: ${(props) => props.theme.spacing.sm}
          ${(props) => props.theme.spacing.sm};
      `}
    ${(props) =>
      props.$variant === 'cart' &&
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
    text-align: center;
    font-size: 1rem;
    font-family: 'Neuzeit S LT Std Medium', sans-serif;
    color: ${(props) => props.theme.colors.text.primary};
    padding: ${(props) => props.theme.spacing.sm}
      ${(props) => props.theme.spacing.xs};
    ${(props) =>
      props.$variant === 'card' &&
      css`
        font-size: 1.2rem;
      `}
    ${(props) =>
      props.$variant === 'cart' &&
      css`
        font-size: 1rem;
      `}
  }
`

export const QuantitySelector = ({ item, variant = 'cart' }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const { setQuantity, cartKey, quantity } = item

  if (!item) return null

  const handleDecrement = () => {
    if (setQuantity) {
      setQuantity(Math.max(1, quantity - 1))
    } else if (cartKey) {
      updateQuantity(cartKey, Math.max(1, quantity - 1))
    }
  }

  const handleIncrement = () => {
    if (setQuantity) {
      setQuantity(quantity + 1)
    } else if (cartKey) {
      updateQuantity(cartKey, quantity + 1)
    }
  }

  return (
    <StyledQuantitySelector $variant={variant}>
      <button onClick={handleDecrement} disabled={quantity <= 1}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrement}>+</button>
    </StyledQuantitySelector>
  )
}
