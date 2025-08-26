import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled, { keyframes } from 'styled-components'

import { media } from '../styles/media'
import { Button } from './Button'

/* === micro-animations === */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`

const shakeX = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
`

const spin = keyframes` to { transform: rotate(360deg); }`

/* === layout === */
const FormShell = styled.section`
  width: 100%;
  display: grid;
  place-items: center;
  animation: ${fadeUp} 420ms ease both;

  @media (min-width: 768px) {
    place-items: start; // Align form to the left on larger screens
    justify-items: start;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: 400px;
  margin: 0;

  ${media.md} {
    max-width: 600px;
    padding: 0;
  }
`

/* inputs/textarea share styles; no underline effect */
const BaseInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 1rem;
  font-weight: ${({ theme }) => theme.fonts.weights.normal};
  line-height: 1.6;
  background: ${({ theme }) => theme.colors.surface};

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.error};
    animation: ${shakeX} 160ms ease;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.lavender};
    border-width: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    &[aria-invalid='true'] {
      animation: none;
    }
  }
`

const Textarea = styled(BaseInput).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 140px;
`

const FeedbackMessage = styled.div`
  color: ${({ theme }) => theme.colors.success};
  margin: ${({ theme }) => theme.spacing.md} 0;
  animation: ${fadeUp} 320ms ease both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  margin-top: 6px;
  animation: ${fadeUp} 200ms ease both;
`

const Spinner = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  margin-right: 8px;
  vertical-align: -2px;
  animation: ${spin} 700ms linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    border-right-color: currentColor; /* becomes a solid dot */
  }
`

const ContactUsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm()
  const [success, setSuccess] = useState(false)
  const successRef = useRef(null)

  useEffect(() => {
    if (success) successRef.current?.focus()
  }, [success])

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to send message')
      reset()
      setSuccess(true)
    } catch (err) {
      setError('root', {
        message: 'Failed to send your message. Please try again later.'
      })
      setSuccess(false)
    }
  }

  if (success) {
    return (
      <FeedbackMessage
        ref={successRef}
        tabIndex={-1}
        role='status'
        aria-live='polite'
      >
        <h2>Thanks! 🎉</h2>
        <p>Your message has been sent. We’ll get back to you soon.</p>
      </FeedbackMessage>
    )
  }

  return (
    <FormShell>
      <StyledForm
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-live='polite'
      >
        <div>
          <BaseInput
            type='text'
            placeholder='Your Name'
            aria-invalid={!!errors.name}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
        </div>

        <div>
          <BaseInput
            type='email'
            placeholder='Your Email'
            aria-invalid={!!errors.email}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' }
            })}
          />
          {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
        </div>

        <div>
          <BaseInput
            type='tel'
            placeholder='Your Phone'
            aria-invalid={!!errors.phone}
            {...register('phone')}
          />
        </div>

        <div>
          <BaseInput
            type='text'
            placeholder='Subject'
            aria-invalid={!!errors.subject}
            {...register('subject')}
          />
        </div>

        <div>
          <Textarea
            placeholder='Your Message'
            rows={6}
            aria-invalid={!!errors.message}
            {...register('message', { required: 'Please write a message' })}
          />
          {errors.message && <ErrorText>{errors.message.message}</ErrorText>}
        </div>

        {errors.root && (
          <ErrorText role='alert'>{errors.root.message}</ErrorText>
        )}

        <Button type='submit' disabled={isSubmitting} aria-busy={isSubmitting}>
          {isSubmitting && <Spinner />}{' '}
          {isSubmitting ? 'Sending...' : 'Send message'}
        </Button>
      </StyledForm>
    </FormShell>
  )
}

export default ContactUsForm
