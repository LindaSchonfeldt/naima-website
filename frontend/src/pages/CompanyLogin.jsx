import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'
import { api } from '../services/api'

const CompanyLogin = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { token, company, customer } = await api.companies.login({ email, password })
      // IMPORTANT: pass company object as second argument so store.persist saves it
      setAuth(token, company)
      // navigate or set additional state
      navigate('/company/dashboard')
    } catch (err) {
      console.error('Login failed', err)
      alert('Login failed')
    }
  }

  return (
    <div>
      <h2>Company Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default CompanyLogin