import styled from "styled-components";

const Skip = styled.a`
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 9999;
  padding: 10px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.brand.salmon};
  color: #111;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transform: translateY(-140%);
  transition: transform 0.2s ease;
  &:focus {
    transform: translateY(0);
    outline: 2px solid #111;
    outline-offset: 2px;
  }
`;

const SkipLink = () => <Skip href="#main">Skip to main content</Skip>;

export default SkipLink;
