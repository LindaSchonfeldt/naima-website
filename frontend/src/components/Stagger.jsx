import styled from 'styled-components'

const Wrap = styled.div`
  --stagger: 0ms;
  & > * {
    opacity: 0;
    transform: translateY(10px);
    transition:
      opacity 420ms ease var(--stagger),
      transform 420ms ease var(--stagger);
  }
  &[data-inview="true"] > * {
    opacity: 1;
    transform: translateY(0);
  }
`

const Stagger = ({ children, step = 80, ...props }) => {
  // Add incremental delays via style
  const items = Array.isArray(children) ? children : [children]
  return (
    <Wrap {...props}>
      {items.map((child, i) =>
        child && typeof child === 'object'
          ? { ...child, props: { ...child.props, style: { ...(child.props?.style || {}), '--stagger': `${i * step}ms` } } }
          : child
      )}
    </Wrap>
  )
}

export default Stagger
