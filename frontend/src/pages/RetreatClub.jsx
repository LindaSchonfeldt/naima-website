import { CompanyLogin } from '../components/CompanyLogin'
import { PageContainer } from '../components/PageContainer'
import styled from 'styled-components'
import { PageTitle } from '../components/PageTitle'

const RetreatClub = () => {
  return (
    <PageContainer>
      <PageTitle>Re:treat Club</PageTitle>
      <p>Join our retreat club...</p>
      <CompanyLogin />
    </PageContainer>
  )
}

export default RetreatClub
