// Terms of Service — content preserved exactly as Krish wrote it
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import AfterlyWordmark from '../components/AfterlyWordmark'
import { PAL, FONT } from '../tokens'

const S = {
  wrapper: { position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', padding: '80px 24px 120px' },
  wordmark: { textDecoration: 'none', display: 'block', marginBottom: 48 },
  label: { fontSize: 11, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: PAL.accent, fontFamily: FONT, marginBottom: 16 },
  h1: { fontFamily: FONT, fontWeight: 800, fontSize: 'clamp(36px, 6vw, 52px)', color: PAL.white, lineHeight: 1.1, letterSpacing: -1, marginBottom: 20 },
  meta: { fontFamily: FONT, fontSize: 14, color: PAL.mutedSoft },
  divider: { width: 48, height: 1, background: 'rgba(124,108,255,0.22)', margin: '40px 0' },
  intro: {
    background: 'rgba(124,108,255,0.07)', border: '1px solid rgba(124,108,255,0.22)',
    borderRadius: 16, padding: '28px 32px', marginBottom: 56,
    color: PAL.lavender, fontFamily: FONT, fontSize: 15, lineHeight: 1.7,
  },
  section: { marginBottom: 48 },
  h2: { fontFamily: FONT, fontWeight: 700, fontSize: 22, color: PAL.white, letterSpacing: -0.3, marginBottom: 14 },
  p: { color: PAL.muted, fontFamily: FONT, marginBottom: 14, fontSize: 15, lineHeight: 1.75 },
  ul: { listStyle: 'none', padding: 0, margin: '14px 0' },
  li: { fontSize: 15, color: PAL.muted, fontFamily: FONT, padding: '6px 0 6px 20px', position: 'relative', lineHeight: 1.75 },
  a: { color: PAL.accent, textDecoration: 'none', borderBottom: '1px solid rgba(124,108,255,0.3)' },
  subBox: {
    background: 'rgba(124,108,255,0.1)', border: '1px solid rgba(124,108,255,0.3)',
    borderRadius: 14, padding: '24px 28px', margin: '20px 0',
  },
  subBoxP: { fontSize: 14, color: PAL.lavender, fontFamily: FONT, marginBottom: 10, lineHeight: 1.7 },
  footer: { marginTop: 80, paddingTop: 32, borderTop: `1px solid rgba(124,108,255,0.22)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 },
  footerP: { fontSize: 13, color: PAL.mutedSoft, fontFamily: FONT, margin: 0 },
  footerNav: { display: 'flex', gap: 24 },
  footerLink: { fontSize: 13, color: PAL.mutedSoft, fontFamily: FONT, textDecoration: 'none' },
}

const Divider = () => <div style={S.divider} />

function LiBullet({ children }) {
  return (
    <li style={S.li}>
      <span style={{ position: 'absolute', left: 0, color: PAL.accent, fontSize: 12, top: 8 }}>—</span>
      {children}
    </li>
  )
}

export default function Terms() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: PAL.bg, paddingTop: mobile ? 52 : 68 }}>
      <Nav mobile={mobile} />
      <div style={{
        position: 'fixed', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 600,
        background: 'radial-gradient(ellipse, rgba(124,108,255,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={S.wrapper}>
        <header style={{ marginBottom: 64 }}>
          <Link to="/" style={S.wordmark}><AfterlyWordmark size={22} /></Link>
          <p style={S.label}>Legal</p>
          <h1 style={S.h1}>Terms of Service</h1>
          <p style={S.meta}>Effective date: April 19, 2025 · Last updated: April 19, 2025</p>
        </header>

        <div style={S.intro}>
          Please read these Terms of Service carefully before using the Afterly app. By downloading, installing, or using Afterly, you agree to be bound by these terms. If you do not agree, do not use the app.
        </div>

        <section style={S.section}>
          <h2 style={S.h2}>1. About Afterly</h2>
          <p style={S.p}>Afterly is a personal wellness app designed to help individuals maintain no-contact after a breakup and support emotional recovery. Afterly is developed and operated by Fnu Krish, an independent developer ("I," "me," or "my").</p>
          <p style={{ ...S.p, marginBottom: 0 }}>Afterly is not a medical product, therapy service, or mental health treatment. It is a self-help tool intended for general wellness purposes only.</p>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>2. Eligibility</h2>
          <p style={{ ...S.p, marginBottom: 0 }}>You must be at least 13 years of age to use Afterly. By using the app, you confirm that you meet this requirement. If you are under 18, you represent that you have your parent or guardian's permission.</p>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>3. Subscriptions & Billing</h2>
          <p style={S.p}>Afterly offers the following subscription options:</p>
          <ul style={S.ul}>
            <LiBullet>Monthly plan — billed monthly</LiBullet>
            <LiBullet>Annual plan — billed once per year, includes a 3-day free trial</LiBullet>
          </ul>
          <div style={S.subBox}>
            <p style={S.subBoxP}><strong style={{ color: PAL.white }}>Auto-renewal disclosure:</strong> Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period. Your account will be charged for renewal within 24 hours prior to the end of the current period at the rate of your selected plan.</p>
            <p style={S.subBoxP}>You can manage and cancel your subscription at any time through your Apple App Store or Google Play account settings. Cancellation takes effect at the end of the current billing period — you will retain access until then.</p>
            <p style={{ ...S.subBoxP, marginBottom: 0 }}>Prices displayed in the app are in your local currency as determined by the App Store or Google Play and may vary by region.</p>
          </div>
          <p style={{ ...S.p, marginBottom: 0 }}>Free trial eligibility is determined by Apple or Google. If you have previously used a free trial for Afterly on the same Apple ID or Google account, you may not be eligible for another.</p>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>4. Refunds</h2>
          <p style={S.p}>All purchases are processed by Apple (App Store) or Google (Google Play). Refund requests are subject to their respective refund policies. I do not have the ability to issue refunds directly.</p>
          <ul style={S.ul}>
            <LiBullet>Apple refunds: <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener" style={S.a}>reportaproblem.apple.com</a></LiBullet>
            <LiBullet>Google refunds: through Google Play support</LiBullet>
          </ul>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>5. Restore Purchases</h2>
          <p style={{ ...S.p, marginBottom: 0 }}>If you previously purchased a subscription and need to restore access, use the "Restore Purchases" option in the app. Your subscription is tied to your Apple ID or Google account and can be recovered by signing in with the same account used at the time of purchase.</p>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>6. Acceptable Use</h2>
          <p style={S.p}>You agree not to use Afterly to:</p>
          <ul style={S.ul}>
            <LiBullet>Violate any applicable law or regulation</LiBullet>
            <LiBullet>Attempt to reverse-engineer, decompile, or extract source code from the app</LiBullet>
            <LiBullet>Use the app in any way that could harm yourself or others</LiBullet>
            <LiBullet>Circumvent any subscription or paywall mechanism</LiBullet>
          </ul>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>7. Not a Medical or Crisis Service</h2>
          <p style={S.p}>Afterly is not a substitute for professional mental health care. If you are experiencing a mental health crisis, thoughts of self-harm, or an emergency, please contact a licensed professional or emergency services immediately.</p>
          <ul style={S.ul}>
            <LiBullet>US Crisis Line: 988 (call or text)</LiBullet>
            <LiBullet>International: <a href="https://www.befrienders.org" target="_blank" rel="noopener" style={S.a}>befrienders.org</a></LiBullet>
          </ul>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>8. Intellectual Property</h2>
          <p style={{ ...S.p, marginBottom: 0 }}>All content within Afterly — including design, copy, illustrations, and code — is owned by Fnu Krish. You may not reproduce, distribute, or create derivative works from any part of the app without explicit written permission.</p>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>9. Disclaimer of Warranties</h2>
          <p style={{ ...S.p, marginBottom: 0 }}>Afterly is provided "as is" without warranties of any kind, either express or implied. I do not warrant that the app will be uninterrupted, error-free, or free of harmful components. Use of the app is at your own risk.</p>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>10. Limitation of Liability</h2>
          <p style={{ ...S.p, marginBottom: 0 }}>To the fullest extent permitted by law, Fnu Krish shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use Afterly, even if advised of the possibility of such damages.</p>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>11. Changes to These Terms</h2>
          <p style={{ ...S.p, marginBottom: 0 }}>I may update these Terms of Service from time to time. When I do, I will update the "Last updated" date at the top of this page. Continued use of Afterly after changes are posted constitutes your acceptance of the revised terms.</p>
        </section>
        <Divider />

        <section style={S.section}>
          <h2 style={S.h2}>12. Governing Law</h2>
          <p style={{ ...S.p, marginBottom: 0 }}>These Terms are governed by the laws of the United States. Any disputes shall be resolved in the courts of competent jurisdiction.</p>
        </section>
        <Divider />

        <section style={{ ...S.section, marginBottom: 0 }}>
          <h2 style={S.h2}>13. Contact</h2>
          <p style={{ ...S.p, marginBottom: 0 }}>Questions about these Terms? Reach out at <a href="mailto:useafterly@gmail.com" style={S.a}>useafterly@gmail.com</a> or visit <a href="https://useafterly.com/support" style={S.a}>useafterly.com/support</a>.</p>
        </section>

        <footer style={S.footer}>
          <p style={S.footerP}>© 2026 Fnu Krish. All rights reserved.</p>
          <nav style={S.footerNav}>
            <Link to="/privacy" style={S.footerLink}>Privacy</Link>
            <Link to="/terms" style={S.footerLink}>Terms</Link>
            <Link to="/support" style={S.footerLink}>Support</Link>
          </nav>
        </footer>
      </div>
    </div>
  )
}
