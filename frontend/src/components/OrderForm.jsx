import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { api } from '../services/api'
import { useAuthStore } from '../stores/useAuthStore'
import { useCartStore } from '../stores/useCartStore'
import { media } from '../styles/media'
import { Button } from './Button'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  width: 100%;
  max-width: 400px; // Mobile-first: max width
  margin: 0 auto; // Center horizontally
  padding: ${(props) => props.theme.spacing.sm};

  input,
  textarea {
    width: 100%;
    font-family: 'Neuzeit S LT Std Medium', sans-serif;
    padding: ${(props) => props.theme.spacing.sm};
    border: 1px solid ${(props) => props.theme.colors.border};
    font-size: 1rem;
    box-sizing: border-box;
  }

  ${media.md} {
    max-width: 800px;
    padding: ${(props) => props.theme.spacing.md};
  }
`
const StyledH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing.md};
  text-align: flex-start;
  color: ${(props) => props.theme.colors.text.primary};
`

const FeedbackMessage = styled.div`
  text-align: flex-start;
  color: ${(props) => props.theme.colors.text.success};
  margin: ${(props) => props.theme.spacing.md} 0;
`

export const OrderForm = ({ cartItems, title = '', ...props }) => {
  const { register, handleSubmit, formState, reset } = useForm()
  const [success, setSuccess] = useState(false)
  const user = useAuthStore((state) => state.user)
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')

  const onSubmit = async (data) => {
    const orderData = { ...data, items: cartItems, userId: user?.id }
    try {
      await api.orders.submitOrder(orderData)
      reset()
      setSuccess(true)
      useCartStore.getState().clearCart() // Clear the cart
    } catch (error) {
      setSuccess(false)
    }
  }

  if (success) {
    return (
      <FeedbackMessage>
        <h2>Thank you for your order!</h2>
        <p>We have received your order and will process it soon.</p>
      </FeedbackMessage>
    )
  }

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(onSubmit)()
      }}
    >
      <StyledH2>{title}</StyledH2>
      <input
        type='text'
        placeholder='Name'
        {...register('name', { required: true })}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type='email'
        placeholder='Email'
        {...register('email', { required: true })}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='text'
        placeholder='Delivery address'
        {...register('address')}
      />
      <input type='text' placeholder='Phone Number' {...register('phone')} />
      <textarea
        placeholder='Special Instructions'
        {...register('instructions')}
      ></textarea>
      <Button type='submit' disabled={formState.isSubmitting}>
        {formState.isSubmitting ? 'Submitting...' : 'Submit Order'}
      </Button>
    </StyledForm>
  )
}
