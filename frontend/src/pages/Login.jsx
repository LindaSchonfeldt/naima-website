import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import { CompanyLogin } from '../components/CompanyLogin'
import { PageContainer } from '../components/PageContainer'

export const Login = () => {
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/company-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ company, password })
    })
    if (res.ok) {
      const data = await res.json()
      setAuth(data.token) // Save token in Zustand
      localStorage.setItem('companyToken', data.token) // Optional: persist
      navigate('/shop')
    } else {
      setError('Invalid credentials')
    }
  }

  return (
    <PageContainer>
      <CompanyLogin
        company={company}
        setCompany={setCompany}
        password={password}
        setPassword={setPassword}
        error={error}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  )
}
