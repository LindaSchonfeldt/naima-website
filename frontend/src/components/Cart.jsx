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
  z-index: 8000; /* stays above most UI */

  ${media.md} {
    /* ensure hamburger / other nav sits below cart button on desktop if needed */
    z-index: 10001;
  }

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
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-end; /* keep menu right-anchored on desktop */
  z-index: 10001;

  /* mobile: full-screen menu already covers content so keep overlay subtle */
  background: rgba(0, 0, 0, 0.08);

  ${media.md} {
    /* desktop: darker backdrop for the drawer */
    background: rgba(0, 0, 0, 0.32);
  }
`

/* cart menu: mobile = full-screen; md+ = right-side drawer (old behaviour) */
const CartMenu = styled.div`
  box-sizing: border-box;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.background};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  padding: ${(props) => props.theme.spacing.md};
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  overflow-y: auto;

  ${media.md} {
    /* old desktop drawer */
    width: 420px;
    height: 100vh;
    border-radius: 0;
    right: 0;
    left: auto;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
  }
`

const MenuContent = styled.div`
  width: 100%;
  box-sizing: border-box;
`

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(p) => p.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};

  h2 {
    margin: 0;
    font-size: 1.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* avoid overlapping header titles */
  }
`

/* Use grid so control widths are stable and text gets the remaining space */
const CartItem = styled.div`
  display: grid;
  grid-template-columns: 64px 1fr 92px 40px;
  gap: ${(props) => props.theme.spacing.sm};
  align-items: center;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.md};
  box-sizing: border-box;

  /* mobile: stack controls under the info for better spacing */
  ${media.sm} {
    grid-template-columns: 64px 1fr;
    grid-template-rows: auto auto;
    grid-auto-flow: row;
    align-items: start;
  }

  /* desktop / large: keep a stable horizontal layout */
  ${media.md} {
    grid-template-columns: 64px 1fr 120px 48px; /* image | info | qty | remove */
    align-items: center;
  }
`

const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0; /* important for truncation/wrapping */
  grid-column: 2 / 3;
  width: 100%;
  box-sizing: border-box;

  ${media.sm} {
    grid-column: 2 / 3;
  }

  ${media.md} {
    /* ensure info uses the full middle column and text wraps nicely */
    padding-right: ${(p) => p.theme.spacing.sm};
  }
`

const CartItemName = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.primary};
  display: block;
  margin-bottom: 4px;
  line-height: 1.15;
  max-width: 100%;
  word-break: break-word;
  white-space: normal;
`

const CartItemPrice = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text.secondary};
  margin-top: 6px;
`

const StyledQuantitySelector = styled(QuantitySelector)`
  flex: 0 0 92px; /* stable width so layout doesn't jump */
  width: 92px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px 0;
  align-self: flex-start;

  ${media.md} {
    align-self: center; /* center vertically on larger screens */
    width: 92px;
    flex: 0 0 92px;
    margin: 0;
  }
`

const StyledImg = styled.img`
  width: 64px;
  height: 64px;
  object-fit: cover;
  margin-right: 8px;
  flex: 0 0 auto;

  ${media.md} {
    width: 60px;
    height: 60px;
  }
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
