import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
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

export default function Home() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{
      minHeight: '100vh', background: PAL.bg, position: 'relative',
      paddingTop: mobile ? 52 : 68,
    }}>
      <Helmet>
        <meta name="google-site-verification" content="t-rN5KFH8EgZ2IaEaTZsd2MU41oiCsTIc1nB3LYvrQQ" />
        <title>afterly — No Contact Support App for Breakups</title>
        <meta name="description" content="afterly helps you stay no contact after a breakup. Urge button, unsent vault, streak tracker. Stop checking their profile. Start healing instead." />
        <meta property="og:title" content="afterly — No Contact Support App for Breakups" />
        <meta property="og:description" content="Stop checking their profile. Start healing instead. afterly gives you support when the urge hits." />
        <meta property="og:url" content="https://useafterly.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://useafterly.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="afterly — No Contact Support App" />
        <meta name="twitter:description" content="Stop checking their profile. Start healing instead." />
        <link rel="canonical" href="https://useafterly.com/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "afterly",
          "operatingSystem": "iOS",
          "applicationCategory": "HealthApplication",
          "description": "No contact support app for breakup recovery. Urge button, unsent vault, streak tracker.",
          "url": "https://useafterly.com",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        })}</script>
      </Helmet>
      <Grain />
      <Nav mobile={mobile} />

      {/* ── Hero ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: mobile ? 'calc(100svh - 52px)' : 'calc(100vh - 68px)',
        display: 'flex',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
      }}>
        <Glow x="25%" y="50%" size={mobile ? 600 : 1100} intensity={0.33} />
        <Glow x="10%" y="80%" size={mobile ? 400 : 700} intensity={0.17} hue="#5e4ed9" />
        {!mobile && <Glow x="76%" y="45%" size={600} intensity={0.18} hue="#9a87ff" />}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1240, margin: '0 auto',
          padding: mobile ? '40px 24px 56px' : '140px 56px 120px',
          display: 'flex',
          flexDirection: mobile ? 'column' : 'row',
          alignItems: mobile ? 'center' : 'center',
          gap: mobile ? 0 : 80,
          textAlign: mobile ? 'center' : 'left',
        }}>
          {/* Left — logo + headline + CTA */}
          <div style={{ flex: mobile ? 'none' : '1 1 0', display: 'flex', flexDirection: 'column', alignItems: mobile ? 'center' : 'flex-start' }}>
            <Heading
              as="h1"
              size={mobile ? 36 : 68}
              style={{ maxWidth: 600, letterSpacing: '-0.04em', lineHeight: 1.04 }}
            >
              Stop checking their profile.{' '}
              <span style={{ color: PAL.muted }}>Start healing instead.</span>
            </Heading>
            <p style={{
              fontFamily: FONT, fontSize: mobile ? 14 : 17, fontWeight: 400,
              color: PAL.muted, lineHeight: 1.55, letterSpacing: -0.15,
              maxWidth: 480, textWrap: 'pretty',
              margin: mobile ? '20px auto 0' : '28px 0 0',
            }}>
              afterly helps you stay no contact — not by willpower, but by giving you support.
            </p>
            <div style={{
              marginTop: mobile ? 28 : 40,
              display: 'flex', flexDirection: 'column',
              alignItems: mobile ? 'center' : 'flex-start',
              gap: 10,
            }}>
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
            {mobile && <ScienceBar mobile={mobile} />}
          </div>

          {/* Right — ScienceBar (desktop only) */}
          {!mobile && (
            <div style={{ flex: '0 0 420px', paddingLeft: 40 }}>
              <ScienceBar mobile={false} />
            </div>
          )}
        </div>
      </section>

      {/* ── Problem ── */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: mobile ? '100svh' : 'calc(100vh - 68px)',
        display: 'flex',
        flexDirection: 'column', justifyContent: 'center', alignItems: 'stretch',
      }}>
        <Glow x="50%" y="50%" size={mobile ? 500 : 900} intensity={0.14} hue="#3a2d6e" />
        {!mobile && <Glow x="5%" y="50%" size={700} intensity={0.22} hue="#5e4ed9" />}
        {!mobile && <Glow x="95%" y="50%" size={700} intensity={0.22} hue="#5e4ed9" />}
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1240, margin: '0 auto',
          padding: mobile ? '64px 24px 64px' : '100px 56px',
          display: mobile ? 'block' : 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: mobile ? 0 : 80,
          textAlign: mobile ? 'center' : 'left',
        }}>

          {/* Left — copy */}
          <div style={{ flex: '1 1 0' }}>
            <Heading size={mobile ? 34 : 64} style={{ letterSpacing: '-0.035em' }}>
              It's 2am.<br />
              <span style={{ color: PAL.muted }}>Their name is right there.</span>
            </Heading>
            <div style={{
              marginTop: mobile ? 28 : 48,
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
            {mobile && (
              <>
                <div style={{
                  marginTop: 32,
                  fontFamily: FONT, fontWeight: 700, fontStyle: 'italic',
                  fontSize: 20, color: PAL.white, letterSpacing: -0.4, lineHeight: 1.3,
                }}>
                  They are gone. The routine is not.
                </div>
                <div style={{
                  marginTop: 40, paddingTop: 24,
                  borderTop: `1px solid ${PAL.cardBorder}`,
                  fontFamily: FONT, fontWeight: 700, fontStyle: 'italic',
                  fontSize: 23, color: PAL.white, letterSpacing: -0.6,
                  textWrap: 'balance', lineHeight: 1.3,
                }}>
                  That's not weakness.<br /><span style={{ color: PAL.accent }}>That's withdrawal.</span>
                </div>
              </>
            )}
          </div>

          {/* Right — They are gone + MessageBubble + That's not weakness (desktop only) */}
          {mobile ? (
            <MessageBubble mobile={true} />
          ) : (
            <div style={{
              flex: '0 0 420px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 0,
            }}>
              <div style={{
                fontFamily: FONT, fontWeight: 700, fontStyle: 'italic',
                fontSize: 26, color: PAL.white, letterSpacing: -0.4, lineHeight: 1.3,
                textAlign: 'center', marginBottom: 8,
              }}>
                They are gone. The routine is not.
              </div>
              <MessageBubble mobile={false} />
              <div style={{
                marginTop: 36,
                paddingTop: 36,
                borderTop: `1px solid ${PAL.cardBorder}`,
                fontFamily: FONT, fontWeight: 700, fontStyle: 'italic',
                fontSize: 32, color: PAL.white, letterSpacing: -0.6,
                textWrap: 'balance', lineHeight: 1.3, textAlign: 'center',
                width: '100%',
              }}>
                That's not weakness.<br /><span style={{ color: PAL.accent }}>That's withdrawal.</span>
              </div>
            </div>
          )}

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
          padding: mobile ? '64px 24px 64px' : '120px 80px',
        }}>
          <div style={{ maxWidth: 860, marginBottom: mobile ? 28 : 56 }}>
            <Heading size={mobile ? 32 : 76}>
              This is what{' '}
              <span style={{ color: PAL.muted }}>you open instead.</span>
            </Heading>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 14 : 28,
          }}>
            {FEATURES.map((f, i) => (
              <Card key={i} padding={mobile ? 24 : 44} style={{
                border: '1px solid rgba(124,108,255,0.28)',
                boxShadow: '0 0 24px rgba(124,108,255,0.12), 0 0 2px rgba(124,108,255,0.20)',
              }}>
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
            You left the relationship. Not the habit.
          </p>
          <div style={{
            marginTop: mobile ? 28 : 48,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          }}>
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
