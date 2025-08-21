import { Button } from '../components/Button'
import styled from 'styled-components'
import { media } from '../styles/media'

const StyledCompanySettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.theme.spacing.md};

  ${media.md} {
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: ${(props) => props.theme.spacing.md};
    width: 100%;
    padding: ${(props) => props.theme.spacing.lg} 0;
  }
`

const StyledButton = styled(Button)`
  margin: ${(props) => props.theme.spacing.sm} 0;
  width: 150px;
`

export const CompanySettings = () => {
  return (
    <StyledCompanySettings>
      <StyledButton>
        <h3>Update address</h3>
      </StyledButton>
      <StyledButton>
        <h3>Manage subscription</h3>
      </StyledButton>
    </StyledCompanySettings>
  )
}
