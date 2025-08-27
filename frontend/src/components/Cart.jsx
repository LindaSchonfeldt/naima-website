import { IoCloseOutline } from 'react-icons/io5'
import { MdDelete } from 'react-icons/md'
import { TiShoppingCart } from 'react-icons/ti'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useAuthStore } from '../stores/useAuthStore'
import { useCartStore } from '../stores/useCartStore'
import { media } from '../styles/media'
import { Button } from './Button'
import { CartNotification } from './CartNotification'
import { QuantitySelector } from './QuantitySelector'

const StyledH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
`

const CartIconButton = styled.button`
  position: relative;
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
  z-index: 50000;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  overflow-y: auto;
  justify-content: flex-start;

  ${media.md} {
    left: auto; // Remove left anchor
    right: 0; // Anchor to the right
    width: 450px; // Fixed width for desktop
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
  align-items: center; /* center children vertically */
  justify-content: space-between;
  width: 100%;
  gap: ${(props) =>
    props.theme.spacing.sm}; /* consistent gap between children */
  padding: ${(props) => props.theme.spacing.xs} 0; /* vertical padding */
  margin-bottom: ${(props) => props.theme.spacing.md};
`
const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto; /* take available horizontal space */
  min-width: 0; /* allow children to truncate/wrap */
`

const CartItemName = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
  display: block;
  margin-bottom: 4px;
  word-break: break-word; /* avoid overflow when long names */
`

const CartItemPrice = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: 6px;
`

const StyledQuantitySelector = styled(QuantitySelector)`
  flex: 0 0 100px; /* fixed width so layout is stable */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px; /* consistent height matching images/buttons */
  margin: 0 ${(props) => props.theme.spacing.sm};
`

const StyledImg = styled.img`
  width: 72px; /* slightly larger so it aligns with selector */
  height: 72px;
  object-fit: cover;
  margin-right: 8px;
`

export const Cart = () => {
  const { isOpen, items, closeCart, toggleCart, removeFromCart, addToCart } =
    useCartStore()

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const companyToken = useAuthStore((state) => state.companyToken)

  // Only show cart if logged in as company
  if (!isLoggedIn || !companyToken) return null

  if (!isOpen)
    return (
      <CartIconButton onClick={toggleCart} aria-label='Open cart'>
        <CartNotification count={items.length} />
        <CartIcon />
      </CartIconButton>
    )

  return (
    <>
      <CartIconButton onClick={toggleCart} aria-label='Open cart'>
        <CartNotification count={items.length} />
        <CartIcon />
      </CartIconButton>
      <CartMenuOverlay onClick={closeCart}>
        <CartMenu
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the cart
        >
          <MenuContent>
            <CartHeader>
              <StyledH2>Your Cart</StyledH2>
              <Button
                variant='icon'
                onClick={closeCart}
                aria-label='Close cart'
              >
                <CloseButton />
              </Button>
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
                    <StyledQuantitySelector variant='cart' item={item} />
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
              <Link to='/company/checkout' onClick={closeCart}>
                <Button
                  variant='primary'
                  aria-label='Proceed to order'
                  as='button'
                >
                  Proceed to order
                </Button>
              </Link>
            )}
            {/* Else show the button as disabled */}
            {items.length === 0 && (
              <Button variant='primary' disabled>
                Proceed to order
              </Button>
            )}
          </MenuContent>
        </CartMenu>
      </CartMenuOverlay>
    </>
  )
}
