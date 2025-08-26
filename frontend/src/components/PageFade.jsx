import styled from "styled-components";

const Shell = styled.div`
  opacity: 0;
  transform: translateY(8px);
  animation: fadeUp 400ms ease both;

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const PageFade = ({ children }) => <Shell>{children}</Shell>;

export default PageFade;
