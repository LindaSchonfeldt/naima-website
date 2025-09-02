import styled from 'styled-components'

const MissionSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`
export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  /* Mobile: stack */
  grid-template-areas:
    'text'
    'media';

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: ${({ $reverse }) =>
      $reverse ? `"media text"` : `"text media"`};
  }
`
export const Text = styled.div`
  grid-area: text;
`
export const Media = styled.div`
  grid-area: media;
  width: 100%;
  aspect-ratio: 4/5;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    aspect-ratio: 1 / 1;
    max-height: 100%;
  }
`
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`

export const Hashtag = styled.h2`
  grid-column: 1/-1;
  justify-self: center;
  text-align: center;
  font-size: clamp(2rem, 9vw, 6rem);
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fonts.weights.heavy};
  margin: ${({ theme }) => theme.spacing.xl} 0
    ${({ theme }) => theme.spacing.lg};
`

export const AboutMission = () => {
  return (
    <MissionSection>
      <Row>
        <Text>
          <h2>WHAT STARTED IN A KITCHEN</h2>
          <p>Became a mission to change fika — for good.</p>
        </Text>
        <Media>
          <Img src='/images/naima-founder.webp' alt='Founder' />
        </Media>
      </Row>
      <Row $reverse>
        <Media>
          <Img src='/images/naima-team.webp' alt='Team' />
        </Media>
        <Text>
          <h2>OUR MISSION</h2>
          <p>To help people feel better through the food they eat.</p>
        </Text>
      </Row>
      <Row>
        <Hashtag>#thefutureoffika</Hashtag>
      </Row>
    </MissionSection>
  )
}
