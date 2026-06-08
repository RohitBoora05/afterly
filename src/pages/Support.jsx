// Support page — content preserved exactly as Krish wrote it
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Glow from '../components/Glow'
import { PAL, FONT } from '../tokens'

export default function Support() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: PAL.bg, paddingTop: mobile ? 52 : 68 }}>
      <Nav mobile={mobile} />

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <Glow x="50%" y="40%" size={mobile ? 600 : 900} intensity={0.18} />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 600, margin: '0 auto',
          padding: mobile ? '60px 24px' : '120px 24px',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: FONT, fontWeight: 800,
            fontSize: mobile ? 48 : 76,
            color: PAL.white, letterSpacing: '-0.04em', lineHeight: 1.04, margin: 0,
          }}>
            We're here.
          </h1>
          <p style={{
            fontFamily: FONT, fontWeight: 400,
            fontSize: 17, color: PAL.muted, lineHeight: 1.55, letterSpacing: -0.15,
            maxWidth: 480, margin: '24px auto 0',
          }}>
            afterly is built by a small team that genuinely cares. If you're having trouble or just need to reach us, we'll get back to you.
          </p>

          <div style={{
            background: 'rgba(124,108,255,0.04)',
            border: `1px solid ${PAL.cardBorder}`,
            borderRadius: 18, padding: mobile ? '32px 24px' : '40px 32px',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            margin: mobile ? '40px 0 0' : '56px 0 0',
          }}>
            <p style={{
              fontFamily: FONT, fontSize: 11, fontWeight: 600,
              color: PAL.accent, letterSpacing: 2, textTransform: 'uppercase',
              margin: '0 0 18px',
            }}>
              Email Support
            </p>
            <p style={{ fontFamily: FONT, fontWeight: 800, fontSize: mobile ? 26 : 32, color: PAL.white, letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0, wordBreak: 'break-word' }}>
              <a href="mailto:useafterly@gmail.com" style={{ color: PAL.white, textDecoration: 'none' }}>useafterly@gmail.com</a>
            </p>
            <p style={{ fontFamily: FONT, fontSize: 14, color: PAL.muted, lineHeight: 1.55, margin: '18px 0 0' }}>
              We typically respond within 24 hours.
            </p>
          </div>

          <p style={{
            fontFamily: FONT, fontSize: 13, color: PAL.mutedSoft,
            lineHeight: 1.6, margin: '28px auto 0', maxWidth: 460,
          }}>
            For billing or subscription issues, you can also restore your purchase directly inside the app.
          </p>
        </div>
      </main>

      <Footer mobile={mobile} />
    </div>
  )
}
