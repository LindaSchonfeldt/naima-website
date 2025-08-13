import { TiShoppingCart } from 'react-icons/ti'
import styled from 'styled-components'

import { useCartStore } from '../stores/useCartStore'
import { media } from '../styles/media'

const CartIcon = styled(TiShoppingCart)`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }

  ${media.md} {
  font-size: 1.5rem;
`
const CartMenu = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.colors.background};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  overflow-y: auto;
  justify-content: center;
  align-items: center;

  ${media.md} {
    width: 400px;
    left: calc(50% - 200px);
  }
`

export const Cart = () => {
  const { isOpen, toggleCart, closeCart } = useCartStore()

  return (
    <>
      <CartIcon onClick={toggleCart} />
      {isOpen && (
        <CartMenu>
          <div>
            <h2>Your Cart</h2>
            {/* Cart items go here */}
            <button onClick={closeCart}>Close</button>
          </div>
        </CartMenu>
      )}
    </>
  )
}
