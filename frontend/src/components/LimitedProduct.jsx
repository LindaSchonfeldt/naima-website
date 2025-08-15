import styled from 'styled-components'

const StyledLimitedProduct = styled.div`
  text-align: left;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: ${(props) => props.theme.spacing.md};
`

export const LimitedProduct = ({ product }) => {
  if (!product) {
    return <div>No product data</div>
  }
}
