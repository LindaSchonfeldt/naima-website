import styled from 'styled-components'

const Container = styled.div`
  padding: ${(props) => props.theme.spacing.xxl}
    ${(props) => props.theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    color: ${(props) => props.theme.colors.text.primary};
    margin-bottom: ${(props) => props.theme.spacing.lg};
  }

  p {
    color: ${(props) => props.theme.colors.text.secondary};
    line-height: ${(props) => props.theme.typography.body.lineHeight};
  }
`

const RetreatClub = () => {
  return (
    <Container>
      <h1>Re:treat Club</h1>
      <p>Join our retreat club...</p>
    </Container>
  )
}

export default RetreatClub
