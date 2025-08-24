import { MdLockOutline } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAuthStore } from '../stores/useAuthStore'
import { media } from '../styles/media'
import { Cart } from './Cart'
import { HamburgerMenu } from './HamburgerMenu'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 100;
  height: ${({ theme }) => theme.layout?.navHeight || '80px'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

   /* 🌈 Nav color tokens */
  --nav-link-color: ${({ theme }) => theme.colors.text.primary};
  --nav-link-hover: ${({ theme }) => theme.colors.brand.salmon};
  --nav-icon-color: ${({ theme }) => theme.colors.text.secondary};
  --nav-icon-hover: ${({ theme }) => theme.colors.brand.salmon};

  ${media.md} {
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.md};
  }
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};

  &:hover, &:focus-visible { 
    color: var(--nav-icon-hover);
  }
`

const Links = styled.div`
  display: none;

  ${media.md} {
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    position: absolute;
    left: 50%;
    top: 50%; /* ✅ Center vertically */
    transform: translate(
      -50%,
      -50%
    ); /* ✅ Center both horizontally and vertically */
    white-space: nowrap;
  }

  ${media.lg} {
    gap: ${({ theme }) => theme.spacing.lg};
  }

  ${media.xl} {
    gap: ${({ theme }) => theme.spacing.xl};
  }

  a {
    color: var(--nav-link-color);
    padding: ${({ theme }) => theme.spacing.sm};
    font-size: 14px;
    border-radius: 4px;
    white-space: nowrap;

    &:hover {
      color: var(--nav-link-hover);
    }
  }
`

const NavSection = styled.div`
  display: flex;
  align-items: center;

  &.left {
    flex: 0 0 auto;
    order: 1;
  }
  &.center {
    flex: 1 1 0%;
    justify-content: center;
    order: 2;
  }
  &.right {
    flex: 0 0 auto;
    justify-content: flex-end;
    order: 3;
    gap: ${(props) => props.theme.spacing.sm};
  }

  ${media.md} {
    &.left {
      order: 1;
    }
    &.center {
      order: 1; /* Move center section to the left */
      justify-content: flex-start;
      flex: 1 1 auto;
    }
    &.right {
      order: 2;
    }
  }
`

const LoginIcon = styled(MdLockOutline)`
  font-size: 20px;
  color: var(--nav-icon-color);
  cursor: pointer;
  transition: color 0.2s;
  margin: 0 ${(props) => props.theme.spacing.sm} 0;

  &:hover, &:focus-visible { 
    color: var(--nav-icon-hover); 
  }
`

export const Nav = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
  const navigate = useNavigate()

  return (
    <StyledNav>
      <NavSection className='left'>
        <HamburgerMenu />
      </NavSection>
      <NavSection className='center'>
        <Logo to='/'>naima</Logo>
      </NavSection>
      <NavSection className='right'>
        {!isLoggedIn && (
          <LoginIcon onClick={() => navigate('/company/login')} />
        )}
        <Cart />
      </NavSection>
      <Links>
        <Link to='/products' className='link-underline'>Products</Link>
        <Link to='/findus' className='link-underline'>Find us</Link>
        <Link to='/ourstory' className='link-underline'>Our story</Link>
        <Link to='/contactus' className='link-underline'>Contact us</Link>
      </Links>
    </StyledNav>
  )
}
