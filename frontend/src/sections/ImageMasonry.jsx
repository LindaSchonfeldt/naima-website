import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import styled from 'styled-components'

const ImageContainer = styled.div`
  margin-bottom: 12px;
`

const Image = styled.img`
  width: 100%;
  height: auto;
`

export const ImageMasonry = ({ masonryImages = [] }) => {
  if (!masonryImages || masonryImages.length === 0) {
    return <p>No images available at the moment.</p>
  }
  if (!Array.isArray(masonryImages)) {
    console.error('Expected masonryImages to be an array')
    return <p>Error: Invalid image data.</p>
  }

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      gutterBreakpoints={{ 350: '12px', 750: '16px', 900: '24px' }}
    >
      <Masonry gutter='12px'>
        {masonryImages.map((image, index) => (
          <ImageContainer key={index}>
            <Image src={image} alt={`Image ${index + 1}`} />
          </ImageContainer>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}
