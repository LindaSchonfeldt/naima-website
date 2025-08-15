import { CompanyLogin } from '../components/CompanyLogin'
import CompanyShop from './CompanyShop'
import { useAuthStore } from '../stores/useAuthStore'

const CompanyPortal = () => {
  const token = useAuthStore((state) => state.token)
  const setToken = useAuthStore((state) => state.setToken)

  if (!token) {
    return <CompanyLogin onLogin={setToken} />
  }

  return <CompanyShop token={token} />
}

export default CompanyPortal
