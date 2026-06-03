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
import AfterlyIcon from '../components/AfterlyIcon'
import { GlyphMoon, GlyphLoop, GlyphStreak } from '../components/Glyphs'
import ScienceBar from '../components/ScienceBar'
import MessageBubble from '../components/MessageBubble'
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
    <div style={{
      minHeight: '100vh', background: PAL.bg, position: 'relative',
      paddingTop: mobile ? 52 : 68,
    }}>
      <Grain />
      <Nav mobile={mobile} />

      {/* ── Hero ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: mobile ? 'calc(100svh - 52px)' : 'auto',
        display: mobile ? 'flex' : 'block',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
      }}>
        <Glow x="60%" y="40%" size={mobile ? 600 : 1100} intensity={0.33} />
        <Glow x="20%" y="80%" size={mobile ? 400 : 700} intensity={0.17} hue="#5e4ed9" />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1240, margin: '0 auto',
          padding: mobile ? '40px 24px 56px' : '80px 56px 120px',
          display: 'flex', flexDirection: 'column',
          alignItems: mobile ? 'center' : 'flex-start',
          textAlign: mobile ? 'center' : 'left',
        }}>
          <div style={{ marginBottom: mobile ? 24 : 44, position: 'relative', display: 'inline-block' }}>
            <AfterlyIcon size={mobile ? 92 : 112} />
            <div style={{
              position: 'absolute',
              bottom: -10, left: '50%',
              transform: 'translateX(-50%)',
              width: '80%', height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(124,108,255,0.7), transparent)',
            }} />
          </div>
          <Heading
            as="h1"
            size={mobile ? 36 : 68}
            style={{ maxWidth: 880, letterSpacing: '-0.04em', lineHeight: 1.04 }}
          >
            You opened this instead of texting them.{' '}
            <span style={{ color: PAL.muted }}>Good.</span>
          </Heading>
          <p style={{
            fontFamily: FONT, fontSize: mobile ? 14 : 17, fontWeight: 400,
            color: PAL.muted, lineHeight: 1.55, letterSpacing: -0.15,
            maxWidth: 480, textWrap: 'pretty',
            margin: mobile ? '20px auto 0' : '28px 0 0',
          }}>
            afterly helps you stay no contact — not by willpower, but by giving you somewhere to go when the urge hits.
          </p>
          <div style={{
            marginTop: mobile ? 28 : 40,
            display: 'flex', flexDirection: 'column',
            alignItems: mobile ? 'center' : 'flex-start',
            gap: 10,
          }}>
            {/* Reddit Pixel: add rdt('track', 'Lead') on click when pixel is installed */}
            <AppStoreButton label={
              <span>Download on the <span style={{ fontSize: '1.1em', fontWeight: 700 }}>App Store</span></span>
            } />
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: PAL.mutedSoft, fontFamily: FONT, fontSize: 13,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: PAL.accent, flexShrink: 0 }} />
              Free to try · iPhone
            </div>
          </div>
          <ScienceBar mobile={mobile} />
        </div>
      </section>

      {/* ── Problem ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: mobile ? '100svh' : 'auto',
        display: mobile ? 'flex' : 'block',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
      }}>
        <Glow x="50%" y="50%" size={mobile ? 500 : 900} intensity={0.14} hue="#3a2d6e" />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 880, margin: '0 auto',
          padding: mobile ? '64px 24px 64px' : '100px 56px',
          textAlign: 'center',
        }}>
          <Heading size={mobile ? 34 : 56} style={{ letterSpacing: '-0.035em' }}>
            {"It's 2am."}<br />
            <span style={{ color: PAL.muted }}>{"Their name is"}<br />{"right there."}</span>
          </Heading>
          <div style={{
            marginTop: mobile ? 28 : 64,
            display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 18,
          }}>
            {[
              "You checked their profile. Again.",
              "You drafted a text you didn't send.",
              "You told yourself tomorrow will be different.",
            ].map((l, i) => (
              <div key={i} style={{
                fontFamily: FONT, fontWeight: 400,
                fontSize: mobile ? 15 : 18, lineHeight: 1.5,
                color: PAL.lavender, opacity: 0.7, letterSpacing: -0.2,
              }}>{l}</div>
            ))}
          </div>
          <MessageBubble mobile={mobile} />
          <div style={{
            marginTop: mobile ? 40 : 72,
            paddingTop: mobile ? 24 : 40,
            borderTop: `1px solid ${PAL.cardBorder}`,
            fontFamily: FONT, fontWeight: 700, fontStyle: 'italic',
            fontSize: mobile ? 23 : 30,
            color: PAL.white, letterSpacing: -0.6,
            textWrap: 'balance', lineHeight: 1.3,
          }}>
            {"That's not weakness."}<br /><span style={{ color: PAL.accent }}>{"That's withdrawal."}</span>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: mobile ? '100svh' : 'auto',
        display: mobile ? 'flex' : 'block',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
      }}>
        <Glow x="80%" y="40%" size={mobile ? 500 : 900} intensity={0.19} />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1240, margin: '0 auto',
          padding: mobile ? '64px 24px 64px' : '100px 56px',
        }}>
          <div style={{ maxWidth: 720, marginBottom: mobile ? 28 : 64 }}>
            <Heading size={mobile ? 32 : 56}>
              This is what{' '}
              <span style={{ color: PAL.muted }}>you open instead.</span>
            </Heading>
          </div>
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
                  marginBottom: mobile ? 14 : 24,
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

      {/* ── Final CTA ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: mobile ? '100svh' : 'auto',
        display: mobile ? 'flex' : 'block',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
      }}>
        <Glow x="50%" y="60%" size={mobile ? 700 : 1300} intensity={0.33} />
        <Glow x="50%" y="60%" size={mobile ? 350 : 600} intensity={0.19} hue="#9a87ff" />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 880, margin: '0 auto',
          padding: mobile ? '150px 24px 80px' : '140px 56px 110px',
          textAlign: 'center',
        }}>
          <Heading size={mobile ? 42 : 76}
            style={{ letterSpacing: '-0.04em', lineHeight: 1.04 }}>
            Your recovery starts tonight.{' '}
            <span style={{ color: PAL.accent }}>Not tomorrow.</span>
          </Heading>
          <p style={{
            fontFamily: FONT, fontSize: mobile ? 16 : 18, fontWeight: 400,
            color: PAL.muted, lineHeight: 1.55,
            margin: mobile ? '20px auto 0' : '36px auto 0',
            maxWidth: 520,
          }}>
            {"Built for people who know what they need to do."}
          </p>
          <div style={{
            marginTop: mobile ? 28 : 48,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          }}>
            {/* Reddit Pixel: add rdt('track', 'Lead') on click when pixel is installed */}
            <AppStoreButton label={
              <span>Download on the <span style={{ fontSize: '1.1em', fontWeight: 700 }}>App Store</span></span>
            } />
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: PAL.mutedSoft, fontFamily: FONT, fontSize: 13,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: PAL.accent, flexShrink: 0 }} />
              Free to try · iPhone
            </div>
          </div>
        </div>
      </section>

      <Footer mobile={mobile} />
    </div>
  )
}
