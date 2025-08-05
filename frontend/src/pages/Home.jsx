import styled from 'styled-components'

const StyledH1 = styled.h1`
  font-size: 4rem;
  color: ${(props) => props.theme.primaryColor};
  text-align: left;
`

const CursiveText = styled.span`
  font-style: italic;
`

const Home = () => {
  return (
    <div>
      <StyledH1>
        Fika with <CursiveText>benefits</CursiveText>
      </StyledH1>
    </div>
  )
}

export default Home
