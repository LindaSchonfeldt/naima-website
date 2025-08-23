import styled from 'styled-components'

const Toast = styled.div`
  position: absolute;
  bottom: 84px;
  right: 0px;
  background: ${(props) => props.theme.colors.brand.primary};
  color: ${(props) => props.theme.colors.text.primary};
  padding: 10px 20px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  z-index: 10;
`

export const ProductCardNotification = ({ children }) => (
  <Toast>{children}</Toast>
)
