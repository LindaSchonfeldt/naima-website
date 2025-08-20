import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CompanyLogin } from '../components/CompanyLogin'
import { useAuthStore } from '../stores/useAuthStore'

const CompanyPortal = () => {
  const companyToken = useAuthStore((state) => state.companyToken)
  const setAuth = useAuthStore((state) => state.setAuth)
  const navigate = useNavigate()

  useEffect(() => {
    if (companyToken) {
      navigate('/company/dashboard')
    }
  }, [companyToken, navigate])

  return <CompanyLogin onLogin={setAuth} />
}

export default CompanyPortal
