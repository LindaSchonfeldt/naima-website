import styled from 'styled-components'

import { PageTitle } from '../components/PageTitle'
import { useAuthStore } from '../stores/useAuthStore'
import MotionReveal from '../components/MotionReveal'

const DashboardContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Info = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: left;
`

const CompanyDashboard = () => {
  const { company, companyToken } = useAuthStore()
  if (!companyToken) {
    return <div>No token provided. Please log in.</div>
  }
  console.log('company:', company)

  return (
    <DashboardContainer>
      <MotionReveal>
        <PageTitle>Welcome, {company?.name || 'Company'}!</PageTitle>
        {/* Add dashboard widgets, stats, links, etc. here */}
        <Info>
          <p>Your company dashboard is under construction.</p>
          <p>Use the navigation above to explore other sections.</p>
        </Info>
      </MotionReveal>
    </DashboardContainer>
  )
}

export default CompanyDashboard
