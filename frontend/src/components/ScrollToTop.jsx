import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = ({ behavior = 'smooth' }) => {
  const { pathname } = useLocation()

  // Prefer reduced motion users: force instant scroll
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced ? 'auto' : behavior
    })
  }, [pathname, behavior, prefersReduced])

  return null
}

export default ScrollToTop
