import styled from 'styled-components'

import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { CompanySettings } from '../sections/CompanySettings'

const CompanyProfile = () => {
  return (
    <PageContainer>
      <PageTitle> Company profile</PageTitle>
      <p>Manage your company profile here.</p>
      <CompanySettings />
    </PageContainer>
  )
}

export default CompanyProfile
