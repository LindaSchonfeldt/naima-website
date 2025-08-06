import { useEffect, useState } from 'react'
import styled from 'styled-components'

const ParallaxContainer = styled.div`
  overflow: hidden;
  position: relative;
  height: ${(props) => props.height || '100vh'};
`

const ParallaxContent = styled.div`
  transform: translateY(${(props) => props.offset}px);
  transition: transform 0.1s ease-out;
  will-change: transform;
`

export const Parallax = ({ children, speed = 0.5, height }) => {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speed)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <ParallaxContainer height={height}>
      <ParallaxContent offset={offset}>{children}</ParallaxContent>
    </ParallaxContainer>
  )
}
