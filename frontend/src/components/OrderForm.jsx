import { useForm } from 'react-hook-form'
import styled from 'styled-components'

import { media } from '../styles/media'
import { Button } from './Button'
import { submitOrder } from '../services/api'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  max-width: 600px;
  margin: 2rem auto;

  input,
  textarea {
    width: 100%;
    font-family: 'Neuzeit S LT Std Medium', sans-serif;
    padding: ${(props) => props.theme.spacing.sm};
    border: 1px solid ${(props) => props.theme.colors.border};
    font-size: 1rem;
  }

  ${media.sm} {
    padding: ${(props) => props.theme.spacing.lg};
  }
`
const StyledH2 = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${(props) => props.theme.spacing.md};
  text-align: center;
  color: ${(props) => props.theme.colors.text.primary};
`

export const OrderForm = ({ title = 'Order Your Fika' }) => {
  const { register, handleSubmit, formState, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      await submitOrder(data)
      reset()
      alert('Order submitted!')
    } catch (error) {
      alert(error.message)
    }
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
      />
      <input
        type='email'
        placeholder='Email'
        {...register('email', { required: true })}
      />
      <input type='text' placeholder='Address' {...register('address')} />
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
