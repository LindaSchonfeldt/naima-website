import styled from 'styled-components'

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing.md};
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`

const LogoImage = styled.img`
  max-height: 60px;
  max-width: 120px;
  object-fit: contain;
`

const LogoText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.text.secondary};
  text-align: center;
`

export const Logo = ({ logo, name, alt }) => {
  return (
    <StyledLogo>
      {logo ? <LogoImage src={logo} alt={alt} /> : <LogoText>{name}</LogoText>}
    </StyledLogo>
  )
}
