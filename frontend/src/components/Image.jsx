import styled from 'styled-components'

const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`

export const Image = ({ src, alt, className }) => {
  return <StyledImage src={src} alt={alt} className={className} />
}
