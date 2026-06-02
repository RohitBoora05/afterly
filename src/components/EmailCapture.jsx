import { useState } from 'react'
import { PAL, FONT } from '../tokens'

// Connect action to Mailchimp embed URL when ready
// Replace MAILCHIMP_ACTION with your Mailchimp form action URL
const MAILCHIMP_ACTION = '#'

export default function EmailCapture({ mobile }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    // TODO: replace with Mailchimp form submission
    // For now just show success state
    setSubmitted(true)
  }

  return (
    <div style={{
      marginTop: mobile ? 40 : 56,
      padding: mobile ? '28px 24px' : '36px 40px',
      background: PAL.cardFill,
      border: `1px solid ${PAL.cardBorder}`,
      borderRadius: 18,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      maxWidth: 480,
      width: '100%',
    }}>
      {submitted ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: FONT, fontSize: 16, fontWeight: 600,
            color: PAL.lavender, margin: 0,
          }}>
            Check your inbox. Day 1 is on its way.
          </p>
        </div>
      ) : (
        <>
          <p style={{
            fontFamily: FONT, fontSize: mobile ? 14 : 15, fontWeight: 400,
            color: PAL.muted, margin: '0 0 20px', lineHeight: 1.5,
          }}>
            Not ready yet? Get the free 7-day guide — what to expect, day by day.
          </p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1, minWidth: 200,
                padding: '12px 16px',
                borderRadius: 10,
                background: 'rgba(230,225,255,0.06)',
                border: `1px solid ${PAL.cardBorder}`,
                color: PAL.lavender,
                fontFamily: FONT, fontSize: 14,
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 22px',
                borderRadius: 10,
                background: PAL.btnBg,
                border: 'none',
                color: PAL.white,
                fontFamily: FONT, fontSize: 14, fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Send me the guide
            </button>
          </form>
        </>
      )}
    </div>
  )
}
