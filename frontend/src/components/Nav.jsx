import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { media } from '../styles/media'

const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: white;
  position: relative;

  ${media.md} {
    justify-content: space-between;
    padding: 1rem 2rem;
  }
`

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #555;
  }
`

const HamburgerButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  left: 1rem;

  ${media.md} {
    display: none;
  }

  span {
    display: block;
    width: 25px;
    height: 3px;
    background: #333;
    margin: 5px 0;
    transition: 0.3s;
  }
`

const Links = styled.div`
  display: none;

  ${media.md} {
    display: flex;
    gap: 0.5rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  ${media.lg} {
    gap: 2rem;
  }

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background: #f5f5f5;
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
        <Link to='/findus'>Find us</Link>
        <Link to='/ourstory'>Our story</Link>
        <Link to='/contactus'>Contact us</Link>
        <Link to='/retreatclub'>Re:treat Club</Link>
      </Links>
    </StyledNav>
  )
}
