import { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { Button } from '../components/Button'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { QuantitySelector } from '../components/QuantitySelector'
import { api } from '../services/api'
import { useAuthStore } from '../stores/useAuthStore'
import { useCartStore } from '../stores/useCartStore'
import { media } from '../styles/media'

/* === micro-animations === */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

const StyledLink = styled.a`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`

const StyledIntro = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.md};
`

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${(props) => props.theme.spacing.md};
  width: 100%;

  ${media.md} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start; // Align left on desktop
    gap: 4rem;
    margin: 0; // Remove auto-centering
  }
`

const StyledH3 = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch; // Make sure items stretch to full width
  justify-content: flex-start;
  gap: ${(props) => props.theme.spacing.sm};
  max-width: 300px;
  min-height: 300px;
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  ${media.sm} {
    max-width: 400px;
    padding: ${(props) => props.theme.spacing.md};
  }

  ${media.md} {
    max-width: 600px;
    padding: ${(props) => props.theme.spacing.lg};
  }
  ${media.lg} {
    max-width: 900px;
  }
`

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
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

const StyledTotal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
`

const BottomPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
  width: 100%;
  margin-top: auto; // Push to the bottom
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};
`

const ItemControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 0.5rem;
`

const ItemControlsLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const FeedbackMessage = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  margin: ${({ theme }) => theme.spacing.md} 0;
  animation: ${fadeUp} 320ms ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Checkout = () => {
  const { items, removeFromCart, totalCost, clearCart } = useCartStore()
  const { company, companyToken, setAuth, setCompany } = useAuthStore()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [loadingCompany, setLoadingCompany] = useState(false)

  // If token exists but company is not loaded, fetch company profile and set it in the auth store
  useEffect(() => {
    let mounted = true
    const loadProfile = async () => {
      if (!company && companyToken) {
        setLoadingCompany(true)
        try {
          const profile = await api.companies.getProfile(companyToken)
          if (mounted && profile) {
            // either set company only or persist token+company
            if (typeof setAuth === 'function') {
              setAuth(companyToken, profile)
            } else if (typeof setCompany === 'function') {
              setCompany(profile)
            } else {
              useAuthStore.getState().setCompany?.(profile)
            }
          }
        } catch (err) {
          console.error('Failed to load company profile:', err)
        } finally {
          mounted && setLoadingCompany(false)
        }
      }
    }
    loadProfile()
    return () => {
      mounted = false
    }
  }, [company, companyToken, setAuth, setCompany])

  const handleSubmitOrder = async () => {
    if (!company || !company._id || !companyToken || !items.length) {
      alert(
        'Company info or cart is missing. Please log in and add items to your cart.'
      )
      return
    }

    // --- changed code: normalize items so backend receives `price` and `productId` ---
    const mappedItems = items.map((it) => ({
      productId: it.productId || it._id || null,
      name: it.name,
      quantity: Number(it.quantity || 1),
      // prefer selectedSize price, fallback to top-level price, ensure Number
      price: Number(it.selectedSize?.price ?? it.price ?? 0)
    }))

    const orderData = {
      name: company.name,
      email: company.email,
      address: company.address,
      phone: company.phone || '',
      company: company._id,
      customer: company._id,
      items: mappedItems,
      totalCost: Number(
        mappedItems.reduce(
          (sum, i) => sum + (i.price || 0) * (i.quantity || 0),
          0
        )
      ).toFixed(2),
      status: 'pending'
    }
    // --- end changed code ---

    setLoading(true)
    setError(null)
    try {
      await api.orders.submitOrder(orderData, companyToken)
      // clear cart but show a success message instead of the empty cart view
      clearCart()
      setShowFeedback(true)
      // optionally keep the user on this page and let them continue shopping via CTA
    } catch (err) {
      console.error('Order submission failed:', err)
      setError(err?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  // Map through items to display them
  return (
    <PageContainer>
      <StyledIntro>
        <PageTitle>Order your fika</PageTitle>
        <p>
          By submitting this form you are placing an order for the items below.
        </p>
        <p>
          If you have any questions, please contact us at{' '}
          <a
            href='mailto: hey@resetwithnaima.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            hey@resetwithnaima.com
          </a>
        </p>
      </StyledIntro>
      {/* Show a prominent success message after placing an order */}
      {showFeedback && (
        <FeedbackMessage role='status' aria-live='polite'>
          <div>Order placed successfully. Your cart has been cleared.</div>
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
            <Button
              onClick={() => {
                // go back to company shop (adjust route if needed)
                setShowFeedback(false)
                navigate('/company/shop')
              }}
            >
              Continue shopping
            </Button>
            <Button
              variant='secondary'
              onClick={() => {
                // close feedback and stay on page (maybe view order history)
                setShowFeedback(false)
                navigate('/company/orders')
              }}
            >
              View orders
            </Button>
          </div>
        </FeedbackMessage>
      )}
      <CheckoutContainer>
        {/* hide the cart items area when showing positive feedback */}
        {!showFeedback && (
          <CartItems>
            <StyledH3>Cart items:</StyledH3>
            {items.map((item) => (
              <div key={item.cartKey}>
                <ItemDetails>
                  <h4 style={{ margin: 0 }}>{item.name}</h4>
                  <ItemControlsRow>
                    <ItemControlsLeft>
                      <QuantitySelector key={item.cartKey} item={item} />
                      <p style={{ margin: 0 }}>
                        à $
                        {item.selectedSize?.price
                          ? item.selectedSize.price
                          : item.price}
                      </p>
                    </ItemControlsLeft>
                    <DeleteButton
                      onClick={() => removeFromCart(item.cartKey)}
                    />
                  </ItemControlsRow>
                </ItemDetails>
              </div>
            ))}
            <BottomPart>
              <StyledTotal>
                <h3>
                  Total: $
                  {items
                    .reduce(
                      (total, item) =>
                        total +
                        (item.selectedSize?.price || item.price) *
                          (item.quantity || 1),
                      0
                    )
                    .toFixed(2)}
                </h3>
              </StyledTotal>
              <Button
                onClick={handleSubmitOrder}
                disabled={loading || loadingCompany || showFeedback}
              >
                {loading
                  ? 'Placing order...'
                  : showFeedback
                  ? 'Order placed'
                  : 'Place order'}
              </Button>
            </BottomPart>
          </CartItems>
        )}
      </CheckoutContainer>

      <p>
        By placing an order, you agree to our{' '}
        <StyledLink href='/terms' target='_blank' rel='noopener noreferrer'>
          Terms and Conditions
        </StyledLink>
      </p>
    </PageContainer>
  )
}

export default Checkout
