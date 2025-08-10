import styled from 'styled-components'

export const SocialIcon = ({ icon, url }) => {
  return (
    <a href={url} target='_blank' rel='noopener noreferrer'>
      <img
        src={icon}
        alt='Social Icon'
        style={{ width: '24px', height: '24px' }}
      />
    </a>
  )
}
