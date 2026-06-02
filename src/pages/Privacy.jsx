// Privacy Policy — content preserved exactly as Krish wrote it
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import AfterlyWordmark from '../components/AfterlyWordmark'
import { PAL, FONT } from '../tokens'

const S = {
  nav: {
    position: 'relative', zIndex: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '24px 56px', maxWidth: 1240, margin: '0 auto', width: '100%',
  },
  content: { maxWidth: 720, margin: '0 auto', padding: '80px 24px' },
  h1: {
    fontFamily: FONT, fontWeight: 800, fontSize: 56, color: PAL.white,
    letterSpacing: '-0.04em', lineHeight: 1.04, margin: 0,
  },
  subtitle: { fontFamily: FONT, fontSize: 14, color: PAL.mutedSoft, letterSpacing: 0.2, margin: '14px 0 0' },
  section: { padding: '36px 0', borderTop: `1px solid ${PAL.cardBorder}` },
  h2: { fontFamily: FONT, fontWeight: 700, fontSize: 22, color: PAL.lavender, letterSpacing: '-0.01em', margin: '0 0 16px' },
  p: { fontFamily: FONT, fontWeight: 400, fontSize: 16, color: PAL.muted, lineHeight: 1.7, margin: '0 0 12px' },
  ul: { margin: '12px 0 0', paddingLeft: 18 },
  li: { fontFamily: FONT, fontSize: 16, color: PAL.muted, lineHeight: 1.7, marginBottom: 10 },
  a: { color: PAL.lavender, textDecoration: 'underline', textDecorationColor: 'rgba(230,225,255,0.3)', textUnderlineOffset: 2 },
  footer: { position: 'relative', borderTop: `1px solid ${PAL.cardBorder}` },
  footerInner: { maxWidth: 1240, margin: '0 auto', padding: '32px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  footerLinks: { display: 'flex', gap: 24 },
  footerLink: { color: PAL.muted, fontFamily: FONT, fontSize: 13, textDecoration: 'none' },
  copy: { fontFamily: FONT, fontSize: 12, color: PAL.mutedSoft },
}

export default function Privacy() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: PAL.bg, paddingTop: mobile ? 52 : 68 }}>
      <Nav mobile={mobile} />

      <main style={S.content}>
        <h1 style={S.h1}>Privacy Policy</h1>
        <p style={S.subtitle}>Last updated: April 18, 2026</p>

        <section style={{ ...S.section, marginTop: 16 }}>
          <h2 style={S.h2}>1. Introduction</h2>
          <p style={S.p}>afterly ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use the afterly mobile application. By using afterly, you agree to the collection and use of information in accordance with this policy.</p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>2. Information We Collect</h2>
          <p style={S.p}>Information you provide directly: first name, email address via Apple or Google Sign In, onboarding questionnaire responses, and unsent letters or journal entries created in the app.</p>
          <p style={S.p}>Information collected automatically: streak data, app usage patterns, daily check-in responses, and subscription status.</p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>3. How We Use Your Information</h2>
          <p style={S.p}>We use your information to create and maintain your account, personalize your recovery plan, provide AI-powered support features, track your no-contact streak, send optional daily notifications, process your subscription, and improve the app.</p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>4. Third-Party Services</h2>
          <p style={S.p}>afterly uses the following third-party services:</p>
          <ul style={S.ul}>
            <li style={S.li}><strong>Supabase</strong> — database and authentication. Privacy Policy: <a href="https://supabase.com/privacy" target="_blank" rel="noopener" style={S.a}>supabase.com/privacy</a></li>
            <li style={S.li}><strong>RevenueCat</strong> — subscription management. Privacy Policy: <a href="https://www.revenuecat.com/privacy" target="_blank" rel="noopener" style={S.a}>revenuecat.com/privacy</a></li>
            <li style={S.li}><strong>Anthropic</strong> — powers AI support features. Your first name and anonymized message content (max 500 characters) are sent for processing. Privacy Policy: <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener" style={S.a}>anthropic.com/privacy</a></li>
            <li style={S.li}><strong>Apple Sign In / Google Sign In</strong> — authentication only. We receive your name and email.</li>
            <li style={S.li}><strong>Expo / EAS</strong> — app delivery and updates. Privacy Policy: <a href="https://expo.dev/privacy" target="_blank" rel="noopener" style={S.a}>expo.dev/privacy</a></li>
          </ul>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>5. Data Storage and Security</h2>
          <p style={S.p}>Your data is stored on Supabase servers protected by Row Level Security. Authentication tokens are stored in your device's secure keychain. We use industry-standard encryption for all data transmission. We never sell your data to third parties.</p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>6. Sensitive Information</h2>
          <p style={S.p}>The personal and emotional content you share within afterly is treated with the highest level of sensitivity and confidentiality. We do not share, sell, or use your emotional content for advertising purposes.</p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>7. Data Retention</h2>
          <p style={S.p}>We retain your data for as long as your account is active. If you delete your account, your personal data is permanently deleted from our servers within 30 days.</p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>8. Your Rights</h2>
          <p style={S.p}>You have the right to access, correct, or delete your personal data. To exercise these rights contact: <a href="mailto:useafterly@gmail.com" style={S.a}>useafterly@gmail.com</a></p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>9. Children's Privacy</h2>
          <p style={S.p}>afterly is not intended for users under the age of 17. We do not knowingly collect data from anyone under 17.</p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>10. Changes to This Policy</h2>
          <p style={S.p}>We may update this policy from time to time. Continued use of the app after changes constitutes acceptance of the updated policy.</p>
        </section>

        <section style={S.section}>
          <h2 style={S.h2}>11. Contact Us</h2>
          <p style={S.p}>Email: <a href="mailto:useafterly@gmail.com" style={S.a}>useafterly@gmail.com</a></p>
          <p style={{ ...S.p, marginBottom: 0 }}>Website: <a href="https://useafterly.com/privacy" style={S.a}>useafterly.com/privacy</a></p>
        </section>
      </main>

      <footer style={S.footer}>
        <div style={S.footerInner}>
          <Link to="/" style={{ textDecoration: 'none' }}><AfterlyWordmark size={15} /></Link>
          <div style={S.footerLinks}>
            <Link to="/privacy" style={S.footerLink}>Privacy</Link>
            <Link to="/terms" style={S.footerLink}>Terms</Link>
            <Link to="/support" style={S.footerLink}>Support</Link>
          </div>
          <div style={S.copy}>© 2026 afterly</div>
        </div>
      </footer>
    </div>
  )
}
