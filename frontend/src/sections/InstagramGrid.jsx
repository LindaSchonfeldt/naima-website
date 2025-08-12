import styled from 'styled-components'
import { useBreakpoint } from '../hooks/useBreakpoint'

const StyledInstagramGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0;

  a {
    display: block;
    line-height: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    aspect-ratio: 1;
  }
`

const mockPosts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  media_url: `https://picsum.photos/400/400?random=${i + 1}`,
  caption: `Beautiful fika moment #${i + 1}`,
  permalink: '#'
}))

export const InstagramGrid = () => {
  const breakpoint = useBreakpoint()
  let postCount = 12
  if (breakpoint === 'tablet') postCount = 8
  if (breakpoint === 'mobile') postCount = 4

  return (
    <StyledInstagramGrid>
      {mockPosts.slice(0, postCount).map((post) => (
        <a
          key={post.id}
          href={post.permalink}
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src={post.media_url} alt={post.caption} />
        </a>
      ))}
    </StyledInstagramGrid>
  )
}
