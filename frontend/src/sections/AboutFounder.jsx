import styled from 'styled-components'

const StyledBody = styled.section`
  p {
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  p:last-child {
    margin-bottom: ${(props) => props.theme.spacing.lg};
  }
`

const Background = styled.div`
  background-color: ${(props) => props.theme.colors.brand.primary};
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding-top: ${(props) => props.theme.spacing.md};
  padding-bottom: ${(props) => props.theme.spacing.md};

  p:last-child {
    margin-bottom: 0;
  }
`

export const AboutFounder = () => {
  return (
    <StyledBody>
      <p> Hi there! My name is Sophie Jahn 👋 </p>
      <p>
        {' '}
        You might know me from <em>Nattryttarna</em> or as the author of{' '}
        <em>Pappas flicka på Hästgården</em>, but my personal journey with food
        began long before that. I grew up with a complicated relationship to
        eating. Food was tied to shame, guilt, control. I spent years chasing
        the “perfect diet”, believing health was about restriction and
        willpower.
      </p>
      <p> But as I began to heal, I learned something different.</p>
      <Background>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 1rem' }}>
          <p>
            {' '}
            When we nourish ourselves with natural, clean foods, everything
            changes. Brain fog lifts. Energy returns. Anxiety fades. We feel
            good. Not just physically, but emotionally. And this is where naima
            began. In my kitchen, with a simple mission.
          </p>
          <p>
            {' '}
            To help people feel better through the food they eat. Naima was born
            from a need to feel better.
          </p>
        </div>
      </Background>
      <p>
        Walk into any grocery store and try to find a snack without a long
        processed ingredient list. We couldn’t. And we looked everywhere.
      </p>
      <p>
        {' '}
        Most products today are full of fillers, additives, refined sugars, and
        seed oils.{' '}
      </p>
      <p>
        {' '}
        Things that science now shows can wear down our bodies and minds. Poor
        nutrition is linked to anxiety, depression and inflammation. And yet,
        the foods we reach for every day still haven’t caught up with this
        knowledge.
      </p>
      <p>
        <strong>
          {' '}
          Naima is here to change that at all costs for us that want better!{' '}
        </strong>
      </p>
    </StyledBody>
  )
}
