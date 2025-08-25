import { useEffect, useRef, useState } from 'react'

export const useInView = (options = { threshold: 0.15, rootMargin: '0px' }) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true)
        obs.unobserve(entry.target) // reveal once
      }
    }, options)

    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}
