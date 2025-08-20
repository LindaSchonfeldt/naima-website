import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAuthStore } from '../stores/useAuthStore'
import { media } from '../styles/media'
import { Button } from './Button'

const CompanyNavBar = styled.nav`
  width: 100%;
  height: 50px;
  background: ${(props) =>
    props.theme.colors.background.secondary || '#f6f6f6'};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary || '#333'};
  padding: 12px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
`

const NavSection = styled.div`
  display: flex;
  align-items: center;

  &.left {
    flex: 1 1 0%;
  }
  &.center {
    flex: 0 1 auto;
    justify-content: center;
    gap: 32px;
  }
  &.right {
    flex: 1 1 0%;
    justify-content: flex-end;
  }
`

export const CompanyNav = () => {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout) // or setToken(null) if that's your logout

  const handleLogout = () => {
    logout() // Clears token and updates state
    navigate('/company/login') // Redirect to login
  }

  return (
    <CompanyNavBar>
      <NavSection className='left' />
      <NavSection className='center'>
        <Link to='/company/dashboard'>Dashboard</Link>
        <Link to='/company/shop'>Shop</Link>
        <Link to='/company/orders'>Orders</Link>
        <Link to='/company/profile'>Profile</Link>
      </NavSection>
      <NavSection className='right'>
        <Button onClick={handleLogout}>Logout</Button>
      </NavSection>
    </CompanyNavBar>
  )
}
