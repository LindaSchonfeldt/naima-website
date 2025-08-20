import { IoCloseOutline } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { TiShoppingCart } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useCartStore } from '../stores/useCartStore'
import { media } from '../styles/media'
import { Button } from './Button'
import { QuantitySelector } from './QuantitySelector'

const StyledH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
`

const CartIconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
  }
`

const CartIcon = styled(TiShoppingCart)`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.secondary};
  }

  ${media.md} {
    font-size: 1.5rem;
  }
`

const CloseButton = styled(IoCloseOutline)`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const DeleteButton = styled(MdDelete)`
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text.secondary};
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const CartMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1999;
  background: rgba(0, 0, 0, 0.2);
`

const CartMenu = styled.div`
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${(props) => props.theme.colors.background};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: ${(props) => props.theme.spacing.md};
  border-radius: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  overflow-y: auto;
  justify-content: flex-start;

  ${media.md} {
    left: auto; // Remove left anchor
    right: 0; // Anchor to the right
    width: 350px; // Fixed width for desktop
    height: 100vh; // Full height
    top: 0; // Align with the top of the viewport
    border-radius: 0;
    justify-content: flex-start;
    align-items: flex-start;
  }
`

const MenuContent = styled.div`
  width: 100%;
`

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`

const CartItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.md};
`
const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const CartItemName = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
`
const CartItemPrice = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.secondary};
`

const StyledImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 8px;
`

export const Cart = () => {
  const { isOpen, items, closeCart, toggleCart, removeFromCart, addToCart } =
    useCartStore()

  if (!isOpen)
    return (
      <CartIconButton onClick={toggleCart} aria-label='Open cart'>
        <CartIcon />
      </CartIconButton>
    )

  return (
    <>
      <CartIconButton onClick={toggleCart} aria-label='Open cart'>
        <CartIcon />
      </CartIconButton>
      <CartMenuOverlay onClick={closeCart}>
        <CartMenu
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the cart
        >
          <MenuContent>
            <CartHeader>
              <StyledH2>Your Cart</StyledH2>
              <button onClick={closeCart} aria-label='Close cart'>
                <CloseButton />
              </button>
            </CartHeader>
            {items.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              items.map((item) => {
                const primaryImage = item.primaryImage?.url
                  ? item.primaryImage
                  : item.images?.find((img) => img.isPrimary) ||
                    item.images?.[0] ||
                    null

                return (
                  <CartItem key={item.cartKey}>
                    {primaryImage && (
                      <StyledImg
                        src={primaryImage.url}
                        alt={primaryImage.alt || item.name}
                      />
                    )}
                    <CartItemInfo>
                      <CartItemName>{item.name}</CartItemName>
                      {item.selectedSize && (
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>
                          Size: {item.selectedSize.packaging} (
                          {item.selectedSize.weight}g)
                        </span>
                      )}
                      <CartItemPrice>
                        {item.selectedSize?.price
                          ? `$${item.selectedSize.price}`
                          : item.formattedPrice || `$${item.price}`}
                      </CartItemPrice>
                    </CartItemInfo>
                    <QuantitySelector variant='cart' item={item} />
                    <Button
                      variant='icon'
                      onClick={() => removeFromCart(item.cartKey)}
                      aria-label='Remove item from cart'
                    >
                      <DeleteButton />
                    </Button>
                  </CartItem>
                )
              })
            )}
            {/* Only show button if there are items in the cart */}
            {items.length > 0 && (
              <Link to='/checkout' onClick={closeCart}>
                <Button as='a' variant='primary' aria-label='Proceed to order'>
                  Proceed to Order Form
                </Button>
              </Link>
            )}
            {/* Else show the button as disabled */}
            {items.length === 0 && (
              <Button variant='primary' disabled>
                Proceed to Order Form
              </Button>
            )}
          </MenuContent>
        </CartMenu>
      </CartMenuOverlay>
    </>
  )
}
