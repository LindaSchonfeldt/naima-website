import { FaInstagram, FaSpotify } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa6'
import styled from 'styled-components'

import { media } from '../styles/media'

const SocialIconsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};

  ${media.lg} {
    margin-top: 0;
  }
`

const SocialIconLink = styled.a`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.brand.salmon};
    transform: scale(1.1);
  }
`

// Define social media links
const socialLinks = [
  { icon: FaFacebook, url: 'https://facebook.com/resetwithnaima', label: 'Facebook' },
  { icon: FaInstagram, url: 'https://instagram.com/resetwithnaima', label: 'Instagram' },
  { icon: FaTiktok, url: 'https://www.tiktok.com/@resetwithnaima', label: 'TikTok' },
  { icon: FaSpotify, url: 'https://open.spotify.com/show/5EfXKBnLhAToIhZjACKSZz?si=69463996f8304ba7', label: 'Spotify' },
  // { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' },
]

export const SocialIcons = ({ links }) => {
  return (
    <SocialIconsContainer>
      {/* ✅ Map over social links */}
      {socialLinks.map(({ icon: Icon, url, label }) => (
        <SocialIconLink
          key={label}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={label}
        >
          <Icon />
        </SocialIconLink>
      ))}
    </SocialIconsContainer>
  )
}
