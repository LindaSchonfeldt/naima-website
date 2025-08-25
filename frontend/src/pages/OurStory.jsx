import { PageContainer } from '../components/PageContainer'
import PageFade from '../components/PageFade'
import { PageTitle } from '../components/PageTitle'
import Reveal from '../components/Reveal'
import { AboutFounder } from '../sections/AboutFounder'
import { AboutMission } from '../sections/AboutMission'

const OurStory = () => {
  return (
    <PageFade>
      <PageContainer>
        <Reveal delay={0}>
          <PageTitle>meet our founder</PageTitle>
        </Reveal>

        <Reveal delay={60}>
          <AboutFounder />
        </Reveal>

        <Reveal delay={120}>
          <AboutMission />
        </Reveal>
      </PageContainer>
    </PageFade>
  )
}

export default OurStory
