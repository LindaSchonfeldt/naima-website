import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
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

const Links = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background: #f5f5f5;
    }
  }
`

export const Nav = () => (
  <StyledNav>
    <Logo to='/'>Naima</Logo>
    <Links>
      <Link to='/findus'>Find us</Link>
      <Link to='/ourstory'>Our story</Link>
      <Link to='/contactus'>Contact us</Link>
      <Link to='/retreatclub'>Re:treat club</Link>
    </Links>
  </StyledNav>
)
