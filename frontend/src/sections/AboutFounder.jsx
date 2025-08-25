import styled from "styled-components";

import Reveal from "../components/Reveal";

const Prose = styled.section`
  p {
    margin: 0 0 ${({ theme }) => theme.spacing.md};
  }
  strong {
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
  em {
    font-style: italic;
  }
`;

const Lead = styled.p`
  font-size: clamp(1.125rem, 1.2vw + 1rem, 1.375rem);
  line-height: 1.6;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const DropCap = styled.p`
  &:first-letter {
    float: left;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fonts.weights.heavy};
    font-size: 3rem;
    line-height: 0.9;
    padding-right: 8px;
  }

  @media (max-width: 640px) {
    &:first-letter {
      float: none;
      font-size: inherit;
      line-height: inherit;
      padding-right: 0;
    }
  }
`;

const NoteCard = styled.aside`
  background: ${({ theme }) => theme.colors.brand.blush};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid ${({ theme }) => theme.colors.brand.salmon};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  p {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  background: linear-gradient(
    to right,
    transparent,
    ${({ theme }) => theme.colors.border},
    transparent
  );
`;

const PullQuote = styled.blockquote`
  border-left: 6px solid ${({ theme }) => theme.colors.brand.primary};
  padding-left: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.lg} 0;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: clamp(1.125rem, 1vw + 1rem, 1.5rem);
  line-height: 1.3;
`;

export const AboutFounder = () => {
  return (
    <Reveal>
      {" "}
      {/* remove this wrapper if you don’t want the tiny fade-in */}
      <Prose>
        <Lead>Hi there! My name is Sophie Jahn 👋</Lead>

        <DropCap>
          You might know me from <em>Nattryttarna</em> or as the author of
          <em> Pappas flicka på Hästgården</em>, but my personal journey with
          food began long before that. I grew up with a complicated relationship
          to eating—shame, guilt, control. For years I chased the “perfect
          diet,” believing health was about restriction and willpower.
        </DropCap>

        <p>As I began to heal, I learned something different.</p>

        <NoteCard>
          <p>
            When we nourish ourselves with natural, clean foods, everything
            changes. Brain fog lifts. Energy returns. Anxiety fades. We feel
            good—not just physically, but emotionally.
          </p>
          <p>
            And this is where Naima began: in my kitchen, with a simple mission—
            to help people feel better through the food they eat.
          </p>
        </NoteCard>

        <Divider />

        <p>
          Walk into any grocery store and try to find a snack without a long,
          processed ingredient list. We couldn’t. And we looked everywhere.
        </p>
        <p>
          Most products today are full of fillers, additives, refined sugars,
          and seed oils—things science shows can wear down our bodies and minds.
        </p>
        <p>
          Poor nutrition is linked to anxiety, depression, and inflammation. And
          yet, the foods we reach for every day still haven’t caught up.
        </p>

        <PullQuote>
          Naima is here to change that—for all of us who want better.
        </PullQuote>
      </Prose>
    </Reveal>
  );
};
