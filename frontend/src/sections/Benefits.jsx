import { motion, useReducedMotion } from 'framer-motion'
import styled from 'styled-components'

import Reveal from '../components/Reveal'
import { media } from '../styles/media'

const Section = styled.section`
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg} 0;
`

const Wrap = styled.div`
  width: min(1100px, 92vw);
  margin: 0 auto;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fonts.weights.heavy};
  text-transform: lowercase;
  letter-spacing: .5px;
  font-size: clamp(1.5rem, 1rem + 2vw, 2.25rem);
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const Intro = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 60ch;
`

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;
  align-items: center;

  ${media.md} {
    grid-template-columns: 1.1fr 1fr;
  }
`

/* --- IMAGES: square edges, subtle elevation on hover --- */
const Figure = styled.figure`
  margin: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};

  .stack {
    display: grid;
    gap: ${({ theme }) => theme.spacing.sm};
    ${media.md} {
      grid-template-columns: 1fr 1fr;
      align-items: end;
    }
  }

  img {
    width: 100%;
    height: clamp(220px, 40vw, 420px);
    object-fit: cover;
    border-radius: 0;              /* ← sharp edges */
    display: block;
    box-shadow: 0 6px 14px rgba(0,0,0,.08);
  }

  .img--secondary {
    ${media.md} { transform: translateY(12%); }
  }

  figcaption { display: none; }
`

/* --- BENEFITS LIST: sharp cards with left accent bar --- */
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Item = styled.li`
  display: grid;
  grid-template-columns: 10px 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 0;          
  padding: ${({ theme }) => theme.spacing.md};
  transition: box-shadow .15s ease, transform .15s ease, border-color .15s ease;

  /* left accent bar */
  .bar {
    display: block;
    width: 10px;
    height: 100%;
    background: ${({ theme }) => theme.colors.brand.salmon};
    align-self: stretch;
    min-height: 40px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(0,0,0,.08);
    border-color: ${({ theme }) => theme.colors.brand.salmon};
  }

  &:focus-within {
    outline: 2px solid ${({ theme }) => theme.colors.brand.salmon};
    outline-offset: 2px;
  }
`

const ItemTitle = styled.h3`
  margin: 0 0 6px;
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: clamp(1rem, .95rem + .3vw, 1.15rem);
`

const ItemText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.55;
`

// motion variants (not hooks)
const cardA = {
  rest:  { x: -6, y: -4, rotate: -2, zIndex: 1, boxShadow: '0 6px 14px rgba(0,0,0,.08)' },
  hover: { x: -12, y: -10, rotate: -4, zIndex: 3, boxShadow: '0 12px 28px rgba(0,0,0,.18)',
           transition: { type: 'spring', stiffness: 280, damping: 22 } }
}
const cardB = {
  rest:  { x:  6, y:  4, rotate:  2, zIndex: 2, boxShadow: '0 6px 14px rgba(0,0,0,.08)' },
  hover: { x:  10, y: 10, rotate:  3, zIndex: 2, boxShadow: '0 12px 28px rgba(0,0,0,.18)',
           transition: { delay: .06, type: 'spring', stiffness: 280, damping: 22 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 6 },
  show:   { opacity: 1, y: 0 }
}

const Benefits = () => {
  const prefersReduced = useReducedMotion()
  const img1 = '/images/pink-shrooms.jpg'
  const img2 = '/images/contact.jpg'

  return (
    <Section aria-labelledby="benefits-title">
      <Wrap>
        <Reveal>
          <Title id="benefits-title">the benefits</Title>
          <Intro>
            Naturally functional fika. Real, plant-based ingredients and gentle superfoods
            designed for steady energy and clear focus—without added sugars or artificial fillers.
          </Intro>
        </Reveal>

        <Grid>
          {/* image collage (hover shuffle) */}
          <Reveal>
            <Figure>
              <motion.div
                className="stack"
                initial="rest"
                animate="rest"
                whileHover={prefersReduced ? 'rest' : 'hover'}
                whileTap={prefersReduced ? 'rest' : 'hover'}
                style={{ touchAction: 'manipulation' }}
              >
                <motion.img
                  src={img1}
                  alt="Functional ingredients and whole-food bases"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  variants={cardA}
                  style={{ willChange: 'transform' }}
                />
                <motion.img
                  className="img--secondary"
                  src={img2}
                  alt="Naima’s clean, plant-based fika squares"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  variants={cardB}
                  style={{ willChange: 'transform' }}
                />
              </motion.div>
              <figcaption>Clean, plant-based ingredients.</figcaption>
            </Figure>
          </Reveal>

          {/* benefits list */}
          <Reveal delay={60}>
            <List
              as={motion.ul}
              initial={prefersReduced ? false : 'hidden'}
              animate={prefersReduced ? undefined : 'show'}
              transition={{ staggerChildren: 0.06, when: 'beforeChildren' }}
            >
              <motion.li variants={itemVariants} as={Item}>
              <span className="bar" aria-hidden="true" />
                <div>
                  <ItemTitle>functional mushrooms</ItemTitle>
                  <ItemText>
                    Carefully chosen varieties commonly used for modern wellness
                    (e.g., lion’s mane for focus, reishi for balance, chaga for antioxidants).*
                  </ItemText>
                </div>
              </motion.li>

              <motion.li variants={itemVariants} as={Item}>
              <span className="bar" aria-hidden="true" />
                <div>
                  <ItemTitle>gluten-free</ItemTitle>
                  <ItemText>
                    Recipes crafted without gluten—favored by people seeking lighter, everyday fika.
                  </ItemText>
                </div>
              </motion.li>

              <motion.li variants={itemVariants} as={Item}>
              <span className="bar" aria-hidden="true" />
                <div>
                  <ItemTitle>lactose-free</ItemTitle>
                  <ItemText>
                    Plant-based fats replace dairy to keep things gentle and satisfying.
                  </ItemText>
                </div>
              </motion.li>

              <motion.li variants={itemVariants} as={Item}>
              <span className="bar" aria-hidden="true" />
                <div>
                  <ItemTitle>100% plant-based</ItemTitle>
                  <ItemText>
                    Simple, recognizable ingredients you can feel good about.
                  </ItemText>
                </div>
              </motion.li>

              <motion.li variants={itemVariants} as={Item}>
              <span className="bar" aria-hidden="true" />
                <div>
                  <ItemTitle>natural ingredients & superfoods</ItemTitle>
                  <ItemText>
                    Whole-food bases with nutrient-dense additions—crafted for taste first, benefits second.
                  </ItemText>
                </div>
              </motion.li>

              <motion.li variants={itemVariants} as={Item}>
              <span className="bar" aria-hidden="true" />
                <div>
                  <ItemTitle>no added sugars</ItemTitle>
                  <ItemText>
                    Sweetness comes from the recipe design—not from syrups or refined sugar.
                  </ItemText>
                </div>
              </motion.li>
            </List>
          </Reveal>
        </Grid>

        {/* small disclaimer to keep claims responsible */}
        <p style={{ marginTop: '0.75rem', color: 'var(--muted, #64748b)', fontSize: '0.9rem' }}>
          *General, educational information; not medical advice or a substitute for professional guidance.
        </p>
      </Wrap>
    </Section>
  )
}

export default Benefits
