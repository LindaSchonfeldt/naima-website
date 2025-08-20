import styled from 'styled-components'

const DashboardContainer = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 16px;
  color: ${(props) => props.theme.colors.primary};
`

const CompanyDashboard = ({ token }) => {
  if (!token) {
    return <div>No token provided. Please log in.</div>
  }

  return (
    <DashboardContainer>
      <SectionTitle>Company Dashboard</SectionTitle>
      {/* Add dashboard widgets, stats, links, etc. here */}
      <div>Welcome! Here are your company stats and actions.</div>
    </DashboardContainer>
  )
}

export default CompanyDashboard
