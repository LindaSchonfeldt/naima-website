import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('companyToken')
  return isLoggedIn ? children : <Navigate to='/login' />
}
