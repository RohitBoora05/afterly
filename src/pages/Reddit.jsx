// Reddit Landing Page — Version B (Urge angle)
// Reddit Pixel: install on the AppStoreButton click below
// URL: /reddit?utm_source=reddit&utm_medium=paid&utm_campaign=breakups_ads

import { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Glow from '../components/Glow'
import Grain from '../components/Grain'
import Card from '../components/Card'
import Heading from '../components/Heading'
import AppStoreButton from '../components/AppStoreButton'
import { GlyphMoon, GlyphLoop, GlyphStreak } from '../components/Glyphs'
import { PAL, FONT } from '../tokens'

const FEATURES = [
  {
    glyph: <GlyphMoon size={26} />,
    title: 'When you almost texted them',
    body: 'One button opens a breathing exercise. The urge peaks. Then it passes.',
  },
  {
    glyph: <GlyphLoop size={26} />,
    title: 'When you need to say it without sending it',
    body: 'Write everything in the Unsent vault. It saves. It never sends.',
  },
  {
    glyph: <GlyphStreak size={26} />,
    title: 'When you want to see yourself healing',
    body: 'Your EMBER orb fills with light every day you stay. Day 1 dark. Day 60 bright.',
  },
]

export default function Reddit() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)

    // Reddit Pixel — install here when ready
    // rdt('track', 'PageVisit');
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: PAL.bg, position: 'relative', overflow: 'hidden' }}>
      <Grain />

      {/* Nav — wordmark only, no download button (no distractions) */}
      <Nav mobile={mobile} minimal={true} />

      {/* ── Hook — above the fold ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <Glow x="60%" y="40%" size={mobile ? 600 : 1100} intensity={0.33} />
        <Glow x="20%" y="80%" size={mobile ? 400 : 700} intensity={0.17} hue="#5e4ed9" />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 880, margin: '0 auto',
          padding: mobile ? '60px 24px 80px' : '100px 56px 120px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <Heading
            as="h1"
            size={mobile ? 38 : 72}
            style={{ maxWidth: 760, letterSpacing: '-0.04em', lineHeight: 1.04 }}
          >
            You opened this instead of texting them.
          </Heading>
          <p style={{
            fontFamily: FONT, fontSize: mobile ? 17 : 20, fontWeight: 400,
            color: PAL.muted, lineHeight: 1.55, letterSpacing: -0.15,
            maxWidth: 520, textWrap: 'pretty',
            margin: mobile ? '24px auto 0' : '32px auto 0',
          }}>
            afterly helps you stay no contact — not by willpower, but by giving you somewhere to go when the urge hits.
          </p>
          <div style={{
            marginTop: mobile ? 36 : 48,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          }}>
            {/* Reddit Pixel: add rdt('track', 'Lead') on click when pixel is installed */}
            <AppStoreButton />
            <div style={{
              fontFamily: FONT, fontSize: 12, color: PAL.mutedSoft, letterSpacing: 0.2,
            }}>
              $9.99/month after trial. Cancel anytime.
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <Glow x="80%" y="40%" size={mobile ? 500 : 900} intensity={0.19} />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1240, margin: '0 auto',
          padding: mobile ? '40px 24px 60px' : '60px 56px 100px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 14 : 20,
          }}>
            {FEATURES.map((f, i) => (
              <Card key={i} padding={mobile ? 24 : 32}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: 'rgba(124,108,255,0.10)',
                  border: `1px solid ${PAL.cardBorderHi}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 24,
                }}>
                  {f.glyph}
                </div>
                <Heading as="h3" size={mobile ? 19 : 21}
                  style={{ letterSpacing: '-0.025em', lineHeight: 1.25 }}>
                  {f.title}
                </Heading>
                <p style={{
                  marginTop: 12, marginBottom: 0,
                  fontFamily: FONT, fontSize: 14, fontWeight: 400,
                  color: PAL.muted, lineHeight: 1.55, letterSpacing: -0.1,
                }}>
                  {f.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Social proof placeholder ── */}
      <section style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          maxWidth: 880, margin: '0 auto',
          padding: mobile ? '0 24px 40px' : '0 56px 60px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: FONT, fontWeight: 400, fontStyle: 'italic',
            fontSize: mobile ? 16 : 18,
            color: PAL.mutedSoft, lineHeight: 1.6,
          }}>
            "Built for people who know what they need to do and can't make themselves do it."
          </p>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <Glow x="50%" y="60%" size={mobile ? 700 : 1300} intensity={0.33} />
        <Glow x="50%" y="60%" size={mobile ? 350 : 600} intensity={0.19} hue="#9a87ff" />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 880, margin: '0 auto',
          padding: mobile ? '60px 24px 60px' : '100px 56px 110px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: FONT, fontSize: mobile ? 17 : 20, fontWeight: 400,
            color: PAL.muted, lineHeight: 1.55,
            margin: '0 auto',
            maxWidth: 520,
          }}>
            The hardest nights don't wait for morning. Neither does afterly.
          </p>
          <div style={{
            marginTop: mobile ? 32 : 40,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          }}>
            {/* Reddit Pixel: add rdt('track', 'Lead') on click when pixel is installed */}
            <AppStoreButton />
            <div style={{
              fontFamily: FONT, fontSize: 12, color: PAL.mutedSoft, letterSpacing: 0.2,
            }}>
              $9.99/month after trial. Cancel anytime.
            </div>
          </div>
        </div>
      </section>

      <Footer mobile={mobile} />
    </div>
  )
}
