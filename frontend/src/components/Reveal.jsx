import styled from "styled-components";

import { useInView } from "../hooks/useInView";

const Shell = styled.div`
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 420ms ease var(--reveal-delay, 0ms),
    transform 420ms ease var(--reveal-delay, 100ms);
  &[data-inview="true"] {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    opacity: 1;
    transform: none;
  }
`;

const Reveal = ({ children, as = "div", delay = 0, ...props }) => {
  const { ref, inView } = useInView();
  return (
    <Shell
      as={as}
      ref={ref}
      data-inview={inView}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...props}
    >
      {children}
    </Shell>
  );
};

export default Reveal;
