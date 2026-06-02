import CTAButton from './CTAButton'
import { GlyphAppStore } from './Glyphs'
import { APP_STORE_URL } from '../tokens'

export default function AppStoreButton({ label = 'Start your 7 days free' }) {
  return (
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <CTAButton>
        <GlyphAppStore />
        {label}
      </CTAButton>
    </a>
  )
}
