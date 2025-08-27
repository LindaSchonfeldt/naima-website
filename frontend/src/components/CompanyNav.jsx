import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { useBreakpoint } from '../hooks/useBreakpoint'
import { useAuthStore } from '../stores/useAuthStore'
import { media } from '../styles/media'
import { Button } from './Button'
import { DropdownMenu } from './DropdownMenu'

const CompanyNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  background: ${(props) =>
    props.theme.colors.background.secondary || '#f6f6f6'};
  font-family: ${(props) => props.theme.fonts.body};
  font-size: 14px;
  color: ${(props) => props.theme.colors.text.primary || '#333'};
  padding: 12px;
  border-bottom: 1px solid #eee;
  position: sticky;
`

const NavSection = styled.div`
  display: flex;
  align-items: space-between;

  ${media.sm} {
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
  }
`

const StyledNavLink = styled(Link)`
  font-family: ${(props) => props.theme.fonts.body};
  color: ${(props) =>
    props.$active ? props.theme.colors.brand.red : 'inherit'};
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  margin: 0 12px;
  transition: color 0.2s;
`

const navOptions = [
  { label: 'Dashboard', value: '/company/dashboard' },
  { label: 'Shop', value: '/company/shop' },
  { label: 'Orders', value: '/company/orders' },
  { label: 'Profile', value: '/company/profile' }
]

export const CompanyNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((state) => state.logout)
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'mobile'

  const handleLogout = () => {
    logout()
    navigate('/company/login')
  }

  const handleNavChange = (value) => {
    if (value && value !== location.pathname) navigate(value)
  }

  return (
    <CompanyNavBar>
      <NavSection className='left'>
        {isMobile && (
          <DropdownMenu
            options={navOptions}
            value={location.pathname}
            onChange={handleNavChange}
            placeholder='Navigate...'
          />
        )}
      </NavSection>
      <NavSection className='center'>
        {!isMobile && (
          <>
            {navOptions.map((opt) => (
              <StyledNavLink
                key={opt.value}
                to={opt.value}
                $active={location.pathname === opt.value}
              >
                {opt.label}
              </StyledNavLink>
            ))}
          </>
        )}
      </NavSection>
      <NavSection className='right'>
        <Button size='small' onClick={handleLogout}>
          Logout
        </Button>
      </NavSection>
    </CompanyNavBar>
  )
}
