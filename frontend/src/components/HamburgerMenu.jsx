import React, { useEffect, useRef }  from 'react'
import { createPortal } from "react-dom"
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { useMenuStore } from '../stores/useMenuStore'
import { media } from '../styles/media'

/* Bar before HamburgerButton to reference it in :hover rules */
const Bar = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  background: var(--nav-icon-color); 
  margin: ${({ theme }) => theme.spacing.xs} 0;
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s, background-color 0.2s;

  &:nth-child(1) { transform: ${({ $isOpen }) => ($isOpen ? 'rotate(45deg) translateY(9px)' : 'none')}; }
  &:nth-child(2) { opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)}; }
  &:nth-child(3) { transform: ${({ $isOpen }) => ($isOpen ? 'rotate(-45deg) translateY(-10px)' : 'none')}; }
`

const HamburgerButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};

  /* on hover, tints the bars to the hover token */
  &:hover ${Bar}, &:focus-visible ${Bar} { 
    background: var(--nav-icon-hover); 
  }

  ${media.md} { display: none; }
`

/* Transparent click-catcher to close when tapping outside menu */
const Backdrop = styled.button`
  position: fixed;
  top: 80px; left: 0; right: 0; bottom: 0;
  background: transparent; /* ← no gray */
  border: 0;
  z-index: 4500;
`

const Menu = styled.nav`
  position: fixed;
  top: 80px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 80px);
  background: ${({ theme }) => theme.colors.background};
  z-index: 5000;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  a {
    color: ${({ theme }) => `var(--nav-link-color, ${theme.colors.text.primary})`};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fonts.weights.medium};
    font-size: 16px;
    padding: 6px 0;
  }

  a:hover,
  a:focus-visible {
    color: ${({ theme }) => `var(--nav-link-hover, ${theme.colors.brand.salmon})`};
  }
`

const Portal = ({ children }) => createPortal(children, document.body)

export const HamburgerMenu = () => {
  const { isOpen, toggleMenu, closeMenu } = useMenuStore()
  const location = useLocation()
  const firstLinkRef = useRef(null)

  // Close when route changes (logo/login)
  useEffect(() => {
    closeMenu()
  }, [location.pathname, closeMenu])

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => { if (e.key === 'Escape') closeMenu() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeMenu])

  // Prevent background scroll when open
  useEffect(() => {
    if (!isOpen) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [isOpen])

  // Focus the first link when the menu opens
  useEffect(() => {
    if (isOpen) {
      // slight delay ensures the portal content is in the DOM
      const id = requestAnimationFrame(() => firstLinkRef.current?.focus())
      return () => cancelAnimationFrame(id)
    }
  }, [isOpen])


  return (
    <>
      <HamburgerButton onClick={toggleMenu} aria-expanded={isOpen} aria-label="Toggle menu">
        <Bar $isOpen={isOpen} />
        <Bar $isOpen={isOpen} />
        <Bar $isOpen={isOpen} />
      </HamburgerButton>

      {isOpen && (
        <Portal>
          <Backdrop onClick={closeMenu} aria-label="Close menu backdrop" />
          <Menu role="dialog" aria-modal="true">
            <Link to="/products"   className="link-underline" onClick={closeMenu}>Products</Link>
            <Link to="/findus"     className="link-underline" onClick={closeMenu}>Find us</Link>
            <Link to="/ourstory"   className="link-underline" onClick={closeMenu}>Our story</Link>
            <Link to="/contactus"  className="link-underline" onClick={closeMenu}>Contact us</Link>
          </Menu>
        </Portal>
      )}
    </>
  )
}
