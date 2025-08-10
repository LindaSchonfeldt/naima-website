import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { media } from '../styles/media'

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
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
      ${(props) => props.theme.spacing.xl};
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

const HamburgerButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  left: ${(props) => props.theme.spacing.md};

  ${media.md} {
    display: none;
  }

  span {
    display: block;
    width: 25px;
    height: 3px;
    background: ${(props) => props.theme.colors.text.primary};
    margin: ${(props) => props.theme.spacing.xs} 0;
    transition: 0.3s;
  }
`

const Links = styled.div`
  display: none;

  ${media.md} {
    display: flex;
    gap: ${(props) => props.theme.spacing.sm};
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
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

    &:hover {
      background: ${(props) => props.theme.colors.surface};
      color: ${(props) => props.theme.colors.primary};
    }
  }
`

export const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <StyledNav>
      <HamburgerButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </HamburgerButton>

      <Logo to='/'>naima</Logo>

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
