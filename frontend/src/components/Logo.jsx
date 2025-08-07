import styled from 'styled-components'

const StyledSVG = styled.svg`
  width: 120px;
  height: 60px;

  path,
  circle,
  rect,
  text {
    fill: ${(props) => props.theme.colors.text.muted};
    transition: fill 0.3s ease;
  }

  &:hover {
    path,
    circle,
    rect,
    text {
      fill: ${(props) => props.theme.colors.primary};
    }
  }
`

const StyledImage = styled.img`
  width: 120px;
  height: 60px;
  object-fit: contain;
  filter: grayscale(100%) brightness(0.5);
  transition: filter 0.3s ease;

  &:hover {
    filter: grayscale(0%) brightness(1);
  }
`

// Updated Logo component that can handle both text and images
export const Logo = ({ children, src, alt }) => {
  // If src is provided, render an image; otherwise render SVG text
  if (src) {
    return <StyledImage src={src} alt={alt} />
  }

  return (
    <StyledSVG viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'>
      <rect
        x='5'
        y='15'
        width='110'
        height='30'
        rx='5'
        fill='currentColor'
        fillOpacity='0.1'
      />
      <text x='60' y='35' fontSize='12' textAnchor='middle' fill='currentColor'>
        {children}
      </text>
    </StyledSVG>
  )
}

// Keep your specific logo components for other uses
export const YasuragiLogo = () => (
  <StyledSVG viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'>
    <path d='M10 10 L50 10 L50 50 L10 50 Z' />
    <text x='30' y='35' fontSize='12'>
      Yasuragi
    </text>
  </StyledSVG>
)

export const RadissonLogo = () => (
  <StyledSVG viewBox='0 0 120 60' xmlns='http://www.w3.org/2000/svg'>
    <path d='M10 10 L50 10 L50 50 L10 50 Z' />
    <text x='30' y='35' fontSize='12'>
      Radisson
    </text>
  </StyledSVG>
)
