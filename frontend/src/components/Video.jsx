import styled from 'styled-components'

const StyledVideo = styled.video`
  width: 100%;
  height: auto;
  object-fit: cover;
`
export const Video = ({ src, ...props }) => {
  return <StyledVideo src={src} {...props} />
}
