import styled from 'styled-components'

import { PageContainer } from '../components/PageContainer'
import PageFade from '../components/PageFade'
import { PageTitle } from '../components/PageTitle'
import Reveal from '../components/Reveal'
import { AboutFounder } from '../sections/AboutFounder'
import { AboutMission } from '../sections/AboutMission'

const Measure = styled.div`
  max-width: ${({ theme }) => theme.layout?.contentMax || '800px'};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`
const OurStory = () => {
  return (
    <PageFade>
      <PageContainer>
        <Reveal delay={0}>
          <Measure>
            <PageTitle>meet our founder</PageTitle>
          </Measure>
        </Reveal>

        <Reveal delay={60}>
          <Measure>
            <AboutFounder />
          </Measure>
        </Reveal>

        <Reveal delay={120}>
          <Measure>
            <AboutMission />
          </Measure>
        </Reveal>
      </PageContainer>
    </PageFade>
  )
}

export default OurStory
