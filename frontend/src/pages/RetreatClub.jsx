import { CompanyLogin } from '../components/CompanyLogin'
import { PageContainer } from '../components/PageContainer'
import styled from 'styled-components'
import { SectionTitle } from '../components/SectionTitle'

const RetreatClub = () => {
  return (
    <PageContainer>
      <SectionTitle>Re:treat Club</SectionTitle>
      <p>Join our retreat club...</p>
      <CompanyLogin />
    </PageContainer>
  )
}

export default RetreatClub
