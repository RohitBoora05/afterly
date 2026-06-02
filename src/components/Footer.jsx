import { Link } from 'react-router-dom'
import AfterlyWordmark from './AfterlyWordmark'
import { PAL, FONT } from '../tokens'

export default function Footer({ mobile }) {
  const links = [
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Support', to: '/support' },
  ]
  return (
    <footer style={{ position: 'relative', borderTop: `1px solid ${PAL.cardBorder}` }}>
      <div style={{
        maxWidth: 1240, margin: '0 auto',
        padding: mobile ? '28px 24px' : '32px 56px',
        display: 'flex', flexDirection: mobile ? 'column' : 'row',
        alignItems: mobile ? 'flex-start' : 'center',
        justifyContent: 'space-between', gap: mobile ? 16 : 0,
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <AfterlyWordmark size={15} />
        </Link>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          {links.map(l => (
            <Link key={l.label} to={l.to} style={{
              color: PAL.muted, fontFamily: FONT,
              fontSize: 13, textDecoration: 'none',
            }}>{l.label}</Link>
          ))}
          <a href="https://findahelpline.com" target="_blank" rel="noopener noreferrer" style={{
            color: PAL.muted, fontFamily: FONT,
            fontSize: 13, textDecoration: 'none',
          }}>Crisis Help</a>
        </div>
        <div style={{ fontFamily: FONT, fontSize: 12, color: PAL.mutedSoft }}>
          © 2026 afterly
        </div>
      </div>
    </footer>
  )
}
