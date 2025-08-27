import styled from "styled-components";

const Skip = styled.a`
  position: absolute;
  left: 0; 
  top: 0;
  z-index: 9999;
  padding: 10px 14px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.brand.salmon};
  color: #111;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);

   /* Visually hidden but focusable */
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  width: 1px; 
  height: 1px;
  overflow: hidden;
  white-space: nowrap;

  &:focus {
    /* Reveal on focus */
    clip: auto; clip-path: none;
    width: auto; height: auto;
    position: fixed;
    top: 12px; left: 12px;
    outline: 2px solid #111; outline-offset: 2px;
  }
`;

const SkipLink = () => <Skip href="#main">Skip to main content</Skip>;

export default SkipLink;
