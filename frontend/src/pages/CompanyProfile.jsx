import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import styled from 'styled-components'
import { CompanySettings } from '../sections/CompanySettings'

const CompanyProfile = () => {
  return (
    <PageContainer>
      <PageTitle> Company Profile</PageTitle>
      <p>Manage your company profile here.</p>
      <CompanySettings />
    </PageContainer>
  )
}

export default CompanyProfile
