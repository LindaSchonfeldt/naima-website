import ProtectedRoute from './ProtectedRoute'
import { Route } from 'react-router-dom'

import { CompanyLogin } from '../components/CompanyLogin'
import CompanyDashboard from '../pages/CompanyDashboard'
import { useAuthStore } from '../stores/useAuthStore'

const CompanyPortal = () => {
  const companyToken = useAuthStore((state) => state.companyToken)
  const setAuth = useAuthStore((state) => state.setAuth)

  if (!companyToken) {
    return <CompanyLogin onLogin={setAuth} />
  }

  return (
    <Route
      path='/company/dashboard'
      element={
        <ProtectedRoute>
          <CompanyDashboard token={companyToken} />
        </ProtectedRoute>
      }
    />
  )
}

export default CompanyPortal
