import styled from "styled-components";

import { PageContainer } from "../components/PageContainer";

const MissionSection = styled(PageContainer)`
  display: flex;
  flex-direction: column;
  gap: ${({theme}) => theme.spacing.xxl};
`
export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;

  /* Mobile: stack */
  grid-template-areas:
    "text"
    "media";

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
  /* max-height: 60vh; */
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    aspect-ratio: auto;
    /* max-height: none; */
  }
`
export const Img = styled.img`
  object-fit: cover;
  object-position: center;
  display: block;
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
        <Img src="/images/naima-founder.webp" alt="Founder" />
        </Media>
      </Row>
      <Row $reverse>
      <Media>
          <Img src="/images/naima-team.webp" alt="Team" />
        </Media>
        <Text>
          <h2>OUR MISSION</h2>
          <p>To help people feel better through the food they eat.</p>
        </Text>
      </Row>
    </MissionSection>
  )
}