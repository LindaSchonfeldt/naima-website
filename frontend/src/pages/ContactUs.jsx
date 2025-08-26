import styled from 'styled-components'

import ContactUsForm from '../components/ContactUsForm'
import { Image } from '../components/Image'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { media } from '../styles/media'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing.md};
  gap: ${(props) => props.theme.spacing.lg};
  width: 100%;
  height: 100%;

  ${media.sm} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    justify-content: space-between;
    height: 60%;
  }
`
const StyledImage = styled(Image)`
  flex: 1;
  width: 280px;
  height: 400px;
  object-fit: cover;
  border-radius: 12px;
`

const ContactUs = () => {
  return (
    <PageContainer id="main" tabIndex={-1}>
      <PageTitle>contact us</PageTitle>
      <Container>
        <ContactUsForm />
      </Container>
    </PageContainer>
  )
}

export default ContactUs
