import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { AboutFounder } from '../sections/AboutFounder'
import { AboutMission } from '../sections/AboutMission'

const OurStory = () => {
  return (
    <PageContainer>
      <PageTitle>meet our founder</PageTitle>
      <AboutFounder />
      <AboutMission />
    </PageContainer>
  )
}

export default OurStory
