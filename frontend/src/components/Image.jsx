import { useState } from 'react'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const Image = ({ src, alt, className, hoverSrc }) => {
  const [isHovered, setIsHovered] = useState(false)
  const displaySrc = isHovered && hoverSrc ? hoverSrc : src

  return (
    <StyledImage
      src={displaySrc}
      alt={alt}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  )
}
