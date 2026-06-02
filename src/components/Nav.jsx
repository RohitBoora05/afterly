import { useState } from 'react'
import { Link } from 'react-router-dom'
import AfterlyWordmark from './AfterlyWordmark'
import CTAButton from './CTAButton'
import { PAL, FONT, APP_STORE_URL } from '../tokens'

export default function Nav({ mobile, minimal = false }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(13,11,24,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(230,225,255,0.06)',
      }}>
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: mobile ? '16px 24px' : '20px 56px',
          maxWidth: 1240, margin: '0 auto', width: '100%',
        }}>
          <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setOpen(false)}>
            <AfterlyWordmark size={mobile ? 16 : 17} />
          </Link>

          {mobile ? (
            /* Hamburger */
            <button
              onClick={() => setOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 4, display: 'flex', flexDirection: 'column',
                gap: 5, alignItems: 'flex-end',
                WebkitTapHighlightColor: 'transparent',
                outline: 'none',
              }}
              aria-label="Menu"
            >
              <span style={{
                display: 'block', height: 1.5, borderRadius: 2,
                background: PAL.lavender,
                width: open ? 22 : 22,
                transition: 'all 200ms',
                transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none',
              }} />
              <span style={{
                display: 'block', height: 1.5, borderRadius: 2,
                background: PAL.lavender, width: 22,
                opacity: open ? 0 : 1,
                transition: 'opacity 200ms',
              }} />
              <span style={{
                display: 'block', height: 1.5, borderRadius: 2,
                background: PAL.lavender,
                width: open ? 22 : 22,
                transition: 'all 200ms',
                transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
              }} />
            </button>
          ) : (
            !minimal && (
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <CTAButton small>Download</CTAButton>
              </a>
            )
          )}
        </nav>

        {/* Mobile menu dropdown */}
        {mobile && (
          <div style={{
            maxHeight: open ? 280 : 0,
            opacity: open ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 400ms cubic-bezier(0.4, 0, 0.2, 1), opacity 350ms cubic-bezier(0.4, 0, 0.2, 1)',
            borderTop: '1px solid rgba(230,225,255,0.06)',
          }}>
          <div style={{ padding: '16px 24px 24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'Home', to: '/', internal: true },
                { label: 'Privacy', to: '/privacy', internal: true },
                { label: 'Terms', to: '/terms', internal: true },
                { label: 'Support', to: '/support', internal: true },
              ].map(item => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: FONT, fontSize: 16, fontWeight: 500,
                    color: PAL.muted, textDecoration: 'none',
                    padding: '12px 0',
                    borderBottom: '1px solid rgba(230,225,255,0.04)',
                    letterSpacing: -0.2,
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <div style={{ marginTop: 16 }}>
                <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                  <CTAButton>Download on the App Store</CTAButton>
                </a>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
    </>
  )
}
