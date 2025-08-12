import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Cart } from './Cart'
import { HamburgerMenu } from './HamburgerMenu'

import { media } from '../styles/media'

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing.md};
  background: ${(props) => props.theme.colors.background};
  position: sticky;
  top: 0;
  z-index: 100;
  height: ${(props) => props.theme.layout?.navHeight || '80px'};
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  ${media.md} {
    justify-content: space-between;
    padding: ${(props) => props.theme.spacing.md}
      ${(props) => props.theme.spacing.md};
  }
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.heading};
  font-weight: ${(props) => props.theme.fonts.weights.bold};
  text-decoration: none;
  color: ${(props) => props.theme.colors.text.primary};

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`

const Links = styled.div`
  display: none;

  ${media.md} {
    display: flex;
    gap: ${(props) => props.theme.spacing.sm};
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
    gap: ${(props) => props.theme.spacing.lg};
  }

  ${media.xl} {
    gap: ${(props) => props.theme.spacing.xl};
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.text.primary};
    font-family: ${(props) => props.theme.fonts.body};
    font-weight: ${(props) => props.theme.fonts.weights.medium};
    padding: ${(props) => props.theme.spacing.sm};
    border-radius: 4px;
    transition: background-color 0.2s;
    white-space: nowrap;

    &:hover {
      background: ${(props) => props.theme.colors.surface};
      color: ${(props) => props.theme.colors.primary};
    }
  }
`

const NavSection = styled.div`
  display: flex;
  align-items: center;

  &.left {
    flex: 0 0 auto;
  }
  &.center {
    flex: 1 1 0%;
    justify-content: center;
  }
  &.right {
    flex: 0 0 auto;
    justify-content: flex-end;
  }
`

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <StyledNav>
      <NavSection className='left'>
        <HamburgerMenu />
      </NavSection>
      <NavSection className='center'>
        <Logo to='/'>naima</Logo>
      </NavSection>
      <NavSection className='right'>
        <Cart />
      </NavSection>
      <Links>
        <Link to='/shop'>Shop</Link>
        <Link to='/findus'>Find us</Link>
        <Link to='/ourstory'>Our story</Link>
        <Link to='/contactus'>Contact us</Link>
        <Link to='/retreatclub'>Re:treat Club</Link>
      </Links>
    </StyledNav>
  )
}
