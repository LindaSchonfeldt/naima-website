import { MdDelete } from 'react-icons/md'
import styled from 'styled-components'

import { OrderForm } from '../components/OrderForm'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { QuantitySelector } from '../components/QuantitySelector'
import { useCartStore } from '../stores/useCartStore'
import { media } from '../styles/media'

const StyledH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.primary};
`

const StyledH3 = styled.h3`
  font-size: 1.25rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`

const StyledH4 = styled.h4`
  font-size: 1rem;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text.secondary};
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
  justify-content: space-between;
  align-items: flex-start;
  gap: ${(props) => props.theme.spacing.md};

${media.md} {
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 4rem; 
  margin: 0;
`

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: ${(props) => props.theme.spacing.sm};
  width: 100%;
  max-width: 100%; // Mobile-first: full width
  min-height: 300px;
  padding: ${(props) => props.theme.spacing.sm};
  border: 1px solid ${(props) => props.theme.colors.border};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text.primary};

  ${media.md} {
    max-width: 400px;
    padding: ${(props) => props.theme.spacing.md};
  }
`

const ItemDetails = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing.sm};
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
  font-size: 16px;
  font-weight: bold;
  margin-top: auto; // Push to the bottom
`

const StyledForm = styled(OrderForm)`
  width: 100%;
  max-width: 100%; // Mobile-first: full width

  ${media.md} {
    max-width: 800px;
  }
`

const Checkout = () => {
  const { items, removeFromCart } = useCartStore()

  // Map through items to display them
  return (
    <PageContainer>
      <StyledIntro>
        <PageTitle>Order Your Fika</PageTitle>
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
      <CheckoutContainer>
        <StyledForm cartItems={items} />
        <CartItems>
          <StyledH3>Cart items:</StyledH3>
          {items.map((item) => (
            <div key={item._id}>
              <StyledH4>{item.name}</StyledH4>
              <ItemDetails>
                <QuantitySelector key={item._id} item={item} />
                <p>à {item.formattedPrice || `$${item.price}`}</p>
                <DeleteButton onClick={() => removeFromCart(item._id)}>
                  Remove
                </DeleteButton>
              </ItemDetails>
            </div>
          ))}
          <StyledTotal>
            <h3>
              Total: {''}
              {items.reduce(
                (total, item) => total + item.price * (item.quantity || 1),
                0
              )}
              $
            </h3>
          </StyledTotal>
        </CartItems>
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
