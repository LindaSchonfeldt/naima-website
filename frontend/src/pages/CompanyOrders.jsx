import styled from 'styled-components'

import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { Orders } from '../sections/Orders'

const CompanyOrders = () => {
  return (
    <PageContainer>
      <PageTitle>Company orders</PageTitle>
      <Orders />
    </PageContainer>
  )
}

export default CompanyOrders
