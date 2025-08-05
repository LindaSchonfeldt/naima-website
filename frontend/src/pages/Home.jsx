import styled from 'styled-components'
import { Video } from '../components/Video'

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledH1 = styled.h1`
  font-size: 4rem;
  color: black;
  text-align: left;
  z-index: 2;
`

const StyledVideo = styled(Video)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`

const CursiveText = styled.span`
  font-style: italic;
`

const Home = () => {
  return (
    <VideoContainer>
      <StyledVideo src='/path/to/video.mp4' autoPlay loop muted />
      <StyledH1>
        Fika with <CursiveText>benefits</CursiveText>
      </StyledH1>
    </VideoContainer>
  )
}

export default Home
