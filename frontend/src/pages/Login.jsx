import { useAuthStore } from '../stores/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { CompanyLogin } from '../components/CompanyLogin'
import { PageContainer } from '../components/PageContainer'

export const Login = () => {
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  const handleLogin = (token) => {
    setAuth(token)
    localStorage.setItem('companyToken', token)
    navigate('/shop')
  }

  return (
    <PageContainer>
      <CompanyLogin onLogin={handleLogin} />
    </PageContainer>
  )
}
