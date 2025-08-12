import { useEffect, useState } from 'react'

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('desktop')

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      if (width < 600) setBreakpoint('mobile')
      else if (width < 900) setBreakpoint('tablet')
      else setBreakpoint('desktop')
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return breakpoint
}
