import styled from 'styled-components'

import { PageContainer } from '../components/PageContainer'
import { Orders } from '../sections/Orders'
import { useAuthStore } from '../stores/useAuthStore'
import { PageTitle } from '../components/PageTitle'

const CompanyOrders = () => {
  return (
    <PageContainer>
      <PageTitle>Company Orders</PageTitle>
      <Orders />
    </PageContainer>
  )
}

export default CompanyOrders
