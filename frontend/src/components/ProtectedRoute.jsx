import { Navigate } from 'react-router-dom'

import { useAuthStore } from '../stores/useAuthStore'

export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  return isLoggedIn ? children : <Navigate to='/company/login' />
}
