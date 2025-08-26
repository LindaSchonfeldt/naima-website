import MotionReveal from '../components/MotionReveal'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import RetailerMap from '../components/RetailerMap'

const FindUs = () => {
  return (
    <PageContainer>
      <MotionReveal>
        <PageTitle $align='center'>find naima near you</PageTitle>
      </MotionReveal>
      <MotionReveal delay={0.1}>
        <RetailerMap />
      </MotionReveal>
    </PageContainer>
  )
}

export default FindUs
