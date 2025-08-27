import styled from 'styled-components'

import MotionReveal from '../components/MotionReveal'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { Orders } from '../sections/Orders'

const CompanyOrders = () => {
  return (
    <MotionReveal>
      <PageContainer>
        <PageTitle>Company orders</PageTitle>
        <Orders />
      </PageContainer>
    </MotionReveal>
  )
}

export default CompanyOrders
