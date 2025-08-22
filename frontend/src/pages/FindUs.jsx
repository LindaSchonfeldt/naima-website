import styled from 'styled-components'

import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import RetailerMap from '../components/RetailerMap'
import { media } from '../styles/media'

const FindUs = () => {
  return (
    <PageContainer>
      <PageTitle>find us</PageTitle>
      <RetailerMap />
    </PageContainer>
  )
}

export default FindUs
