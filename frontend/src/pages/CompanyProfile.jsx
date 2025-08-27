import MotionReveal from '../components/MotionReveal'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { CompanySettings } from '../sections/CompanySettings'

const CompanyProfile = () => {
  return (
    <MotionReveal>
      <PageContainer>
        <PageTitle> Company profile</PageTitle>
        <p>Manage your company profile here.</p>
        <CompanySettings />
      </PageContainer>
    </MotionReveal>
  )
}

export default CompanyProfile
