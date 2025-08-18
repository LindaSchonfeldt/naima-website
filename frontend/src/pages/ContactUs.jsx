import ContactUsForm from '../components/ContactUsForm'
import { PageContainer } from '../components/PageContainer'
import { PageTitle } from '../components/PageTitle'

const ContactUs = () => {
  return (
    <PageContainer>
      <PageTitle align="center">contact us</PageTitle>
      <ContactUsForm />
    </PageContainer>
  )
}

export default ContactUs
