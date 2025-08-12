import styled from 'styled-components'
import { media } from '../styles/media'
import { Button } from './Button'
import { useForm } from 'react-hook-form'

const StyledOrderForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};
  max-width: 600px;
  margin: 0 auto;

  ${media.sm} {
    padding: ${(props) => props.theme.spacing.lg};
  }
`

export const OrderForm = () => {
  const { register, handleSubmit, formState } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <StyledOrderForm onSubmit={handleSubmit(onSubmit)}>
      <h2>Order Your Fika</h2>
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
      <input type='number' placeholder='Phone Number' {...register('phone')} />
      <textarea
        placeholder='Special Instructions'
        {...register('instructions')}
      ></textarea>
      <Button type='submit' disabled={formState.isSubmitting}>
        {formState.isSubmitting ? 'Submitting...' : 'Submit Order'}
      </Button>
    </StyledOrderForm>
  )
}
