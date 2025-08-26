import ContactUsForm from '../components/ContactUsForm'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'
import { Image } from '../components/Image'
import styled from 'styled-components'
import { media } from '../styles/media'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.md};
  gap: ${(props) => props.theme.spacing.lg};
  width: 100%;
  height: 100%;

  ${media.sm} {
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    height: 60%;
  }
`
const StyledImage = styled(Image)`
  flex: 1;
  width: 280px;
  height: 400px;
  object-fit: cover;
`

const ContactUs = () => {
  return (
    <PageContainer>
      <PageTitle>Contact us</PageTitle>
      <Container>
        <ContactUsForm />
        <StyledImage src='/images/contact.jpg' alt='' />
      </Container>
    </PageContainer>
  )
}

export default ContactUs
