import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useMenuStore } from '../stores/useMenuStore'
import { media } from '../styles/media'

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
`

const Bar = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  background: ${(props) => props.theme.colors.text.primary};
  margin: ${(props) => props.theme.spacing.xs} 0;
  border-radius: 2px;
  transition: 0.3s;

  &:nth-child(1) {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(45deg) translateY(9px)' : 'none'};
  }
  &:nth-child(2) {
    opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
  }
  &:nth-child(3) {
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(-45deg) translateY(-10px)' : 'none'};
  }
`

const Menu = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 80px);
  background: ${(props) => props.theme.colors.background};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  padding: ${(props) => props.theme.spacing.md};
  gap: ${(props) => props.theme.spacing.md};
`

export const HamburgerMenu = () => {
  const { isOpen, toggleMenu, closeMenu } = useMenuStore()

  return (
    <>
      <HamburgerButton onClick={toggleMenu}>
        <Bar $isOpen={isOpen} />
        <Bar $isOpen={isOpen} />
        <Bar $isOpen={isOpen} />
      </HamburgerButton>
      {isOpen && (
        <Menu>
          <Link to='/findus' onClick={closeMenu}>
            Find us
          </Link>
          <Link to='/ourstory' onClick={closeMenu}>
            Our story
          </Link>
          <Link to='/contactus' onClick={closeMenu}>
            Contact us
          </Link>
          <Link to='/retreatclub' onClick={closeMenu}>
            Re:treat Club
          </Link>
        </Menu>
      )}
    </>
  )
}
