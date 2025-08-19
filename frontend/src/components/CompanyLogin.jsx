import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useState } from 'react'

import { api } from '../services/api'
import { PageContainer } from './PageContainer'
import { media } from '../styles/media'
import { Button } from './Button'

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

export const CompanyLogin = ({ onLogin }) => {
  const { register, handleSubmit, formState } = useForm()
  const [error, setError] = useState('')

  const onSubmit = async (data) => {
    setError('')
    try {
      const res = await api.companies.login(data)
      onLogin(res.token) // Pass token to parent or store in Zustand
    } catch (err) {
      setError('Login failed. Please check your credentials.')
    }
  }

  return (
    <PageContainer>
      <LoginContainer>
        <h2>Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Company Email
            <input
              type='email'
              autoComplete='email' // Auto-complete for email
              {...register('email', { required: true })}
            />
          </label>
          <label>
            Password
            <input
              type='password'
              autoComplete='current-password' // Auto-complete for password
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
    </PageContainer>
  )
}
