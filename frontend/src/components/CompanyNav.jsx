import { useMemo } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useBreakpoint } from '../hooks/useBreakpoint'
import { useAuthStore } from '../stores/useAuthStore'
import { media } from '../styles/media'
import { Button } from './Button'

const CompanyNavBar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 56px;
  background: ${({ theme }) => theme.colors.surface || '#f6f6f6'};
  color: ${({ theme }) => theme.colors.text.primary || '#333'};
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border || '#eee'};
  position: sticky;
  top: 0;
  z-index: 40;
`

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};

  &.left   { justify-content: flex-start; }
  &.center { justify-content: center; }
  &.right  { justify-content: flex-end; }
`

const StyledNavLink = styled(NavLink)`
  min-height: 44px;
  display: inline-flex;
  align-items: center;

  padding: 0 6px;
  border-radius: 6px;

  color: ${({ theme }) => theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  text-decoration: none;

  transition: color .2s ease, background-color .2s ease;

  &:hover { color: ${({ theme }) => theme.colors.brand.salmon}; }
  
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.salmon};
    outline-offset: 2px;
  }

  /* Active route (NavLink adds aria-current="page") */
  &[aria-current="page"] {
    color: ${({ theme }) => theme.colors.brand.salmon};
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

/* Accessible native select for mobile */
const MobileSelect = styled.select`
  min-height: 44px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text.primary};
  font: inherit;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.brand.salmon};
    outline-offset: 2px;
  }
`

const SrOnly = styled.label`
  position: absolute !important;
  clip: rect(1px,1px,1px,1px);
  clip-path: inset(50%);
  width: 1px; height: 1px; margin: -1px; overflow: hidden; white-space: nowrap;
  border: 0; padding: 0;
`

const navOptions = [
  { label: 'Dashboard', value: '/company/dashboard' },
  { label: 'Shop',      value: '/company/shop' },
  { label: 'Orders',    value: '/company/orders' },
  { label: 'Profile',   value: '/company/profile' }
]

export const CompanyNav = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((s) => s.logout)
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'mobile'

  const currentPath = location.pathname
  const selectValue = useMemo(
    () => navOptions.find(o => o.value === currentPath)?.value ?? navOptions[0].value,
    [currentPath]
  )

  const handleLogout = () => {
    logout()
    navigate('/company/login')
  }

  const handleSelectChange = (e) => {
    const value = e.target.value
    if (value && value !== currentPath) navigate(value)
  }

  return (
    <CompanyNavBar role="navigation" aria-label="Company dashboard navigation">
      <NavSection className="left">
        {isMobile && (
          <>
            <SrOnly htmlFor="company-nav">Navigate company pages</SrOnly>
            <MobileSelect
              id="company-nav"
              value={selectValue}
              onChange={handleSelectChange}
            >
              {navOptions.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </MobileSelect>
          </>
        )}
      </NavSection>

      <NavSection className="center" aria-label="Primary company pages">
        {!isMobile && navOptions.map(opt => (
          <StyledNavLink key={opt.value} to={opt.value}>
            {opt.label}
          </StyledNavLink>
        ))}
      </NavSection>

      <NavSection className="right">
        <Button size="small" onClick={handleLogout}>Logout</Button>
      </NavSection>
    </CompanyNavBar>
  )
}
