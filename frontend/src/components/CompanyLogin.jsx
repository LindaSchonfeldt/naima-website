// CompanyLogin.jsx
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { api } from '../services/api'
import { useAuthStore } from '../stores/useAuthStore'
import { media } from '../styles/media'
import { Button } from './Button'
import MotionReveal from './MotionReveal'
import { PageContainer } from './PageContainer'
import { PageTitle } from './PageTitle'

/* --- tiny animations --- */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
`
const shakeX = keyframes`
  0%,100%{transform:translateX(0)}
  20%{transform:translateX(-4px)}
  40%{transform:translateX(4px)}
  60%{transform:translateX(-3px)}
  80%{transform:translateX(3px)}
`

const LoginContainer = styled.section`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};

  ${media.sm} { max-width: 360px; padding: ${({ theme }) => theme.spacing.md}; }
  ${media.md} { max-width: 420px; }

  form {
    display: grid;
    gap: ${({ theme }) => theme.spacing.md};
  }
`

const Field = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xs};
`

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`

const InputWrap = styled.div`
  position: relative;
`

const Input = styled.input`
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
  padding: 0.6rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.surface};
  font: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.salmon};
    outline-offset: 2px;
  }

  &[aria-invalid='true']{
    border-color: ${({ theme }) => theme.colors.error};
    animation: ${shakeX} 160ms ease;
  }
`

const TogglePwd = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  cursor: pointer;
  font-size: .9rem;
  padding: .25rem .4rem;
  border-radius: 4px;
  min-height: 32px;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.salmon};
    outline-offset: 2px;
  }
`

const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.error};
  font-size: 0.9rem;
  animation: ${fadeUp} 200ms ease both;
`

const ErrorSummary = styled.div`
  margin-top: .25rem;
  padding: .5rem .75rem;
  border: 1px solid ${({ theme }) => theme.colors.error};
  background: #fff5f5;
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.error};
`

const ContactSales = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: 0.95rem;

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`

export const CompanyLogin = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)

  const [serverError, setServerError] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const alertRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: 'onSubmit',          // validate on submit
    reValidateMode: 'onBlur',  // recheck when user fixes fields
    shouldFocusError: true
  })

  useEffect(() => {
    if (serverError) alertRef.current?.focus()
  }, [serverError])

  const onSubmit = async (formData) => {
    setServerError('')
    try {
      const resp = await api.companies.login(formData)
      const token = resp.token || resp.accessToken
      let company = resp.company || resp.profile

      if (token && !company) {
        try { company = await api.companies.getProfile(token) } catch {}
      }

      if (typeof setAuth === 'function') setAuth(token, company)
      navigate('/company/dashboard')
    } catch (e) {
      setServerError('Invalid email or password. Please try again.')
      // also mark both fields invalid for SR users linked to message
      setError('email', { type: 'server' })
      setError('password', { type: 'server' })
    }
  }

  return (
    <PageContainer>
      <MotionReveal>
        <LoginContainer>
          <PageTitle $align="left">Partner login</PageTitle>

          {/* live region for server errors */}
          {serverError && (
            <ErrorSummary
              ref={alertRef}
              role="alert"
              tabIndex={-1}
              aria-live="assertive"
            >
              {serverError}
            </ErrorSummary>
          )}

          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-err' : undefined}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    // simple, practical email pattern
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email address'
                  }
                })}
              />
              {errors.email && (
                <ErrorText id="email-err" role="alert">
                  {errors.email.message || 'Please check this field'}
                </ErrorText>
              )}
            </Field>

            <Field>
              <Label htmlFor="password">Password</Label>
              <InputWrap>
                <Input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'pwd-err' : undefined}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Use at least 6 characters'
                    }
                  })}
                />
                <TogglePwd
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  aria-pressed={showPwd}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? 'Hide' : 'Show'}
                </TogglePwd>
              </InputWrap>
              {errors.password && (
                <ErrorText id="pwd-err" role="alert">
                  {errors.password.message || 'Please check this field'}
                </ErrorText>
              )}
            </Field>

            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              aria-live="polite"
            >
              {isSubmitting ? 'Logging in…' : 'Login'}
            </Button>
          </form>

          <ContactSales>
            Not a partner yet?{' '}
            <a href="mailto:hey@resetwithnaima.com">Contact sales</a>
          </ContactSales>
        </LoginContainer>
      </MotionReveal>
    </PageContainer>
  )
}
