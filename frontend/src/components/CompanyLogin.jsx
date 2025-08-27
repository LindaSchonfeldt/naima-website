import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { api } from '../services/api'
import { useAuthStore } from '../stores/useAuthStore'
import { media } from '../styles/media'
import { Button } from './Button'
import { PageContainer } from './PageContainer'
import MotionReveal from './MotionReveal'
import { PageTitle } from './PageTitle'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  padding: ${(props) => props.theme.spacing.sm};

  ${media.sm} {
    max-width: 300px;
    padding: ${(props) => props.theme.spacing.md};
  }

  ${media.md} {
    max-width: 400px;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: ${(props) => props.theme.spacing.md};
    gap: ${(props) => props.theme.spacing.sm};
    font-family: 'Neuzeit S LT Std Medium', sans-serif;
  }

  h2 {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.colors.text.primary || '#333'};
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`

export const CompanyLogin = () => {
  const { register, handleSubmit, formState } = useForm()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (formData) => {
    try {
      const response = await api.companies.login(formData)
      const token = response.token || response.accessToken
      let company = response.company || response.profile

      // if company not returned, fetch it using the token
      if (token && !company) {
        try {
          company = await api.companies.getProfile(token)
        } catch (err) {
          console.warn('Could not fetch profile after login:', err)
        }
      }

      // Persist token + company
      const setAuth = useAuthStore.getState().setAuth
      if (typeof setAuth === 'function') setAuth(token, company)
      navigate('/company/dashboard')
    } catch (err) {
      // Handle login error
      console.error('Login error:', err)
      setError('Invalid email or password. Please try again.')
    }
  }

  return (
    <PageContainer>
      <MotionReveal>
        <LoginContainer>
          <PageTitle $align="center">Login</PageTitle>
          <form onSubmit={handleSubmit(handleLogin)}>
            <label>
              Company Email
              <input
                type='email'
                autoComplete='email'
                {...register('email', { required: true })}
                />
            </label>
            <label>
              Password
              <input
                type='password'
                autoComplete='current-password'
                {...register('password', { required: true })}
                />
            </label>
            <Button type='submit' disabled={formState.isSubmitting}>
              {formState.isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
            {error && (
              <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>
            )}
          </form>
        </LoginContainer>
      </MotionReveal>
    </PageContainer>
  )
}
