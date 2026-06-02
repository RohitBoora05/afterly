import { useState, useEffect } from 'react'
import { PAL, FONT } from '../tokens'

export default function MessageBubble({ mobile }) {
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setCursor(c => !c), 530)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{
      margin: mobile ? '40px auto 0' : '52px auto 0',
      maxWidth: mobile ? 340 : 400,
      width: '100%',
    }}>

      {/* Compose bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(124,108,255,0.10)',
        border: `1px solid rgba(230,225,255,0.18)`,
        borderRadius: 26,
        padding: '11px 12px 11px 18px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        <div style={{ flex: 1 }}>
          <span style={{
            fontFamily: FONT, fontSize: 15,
            color: PAL.muted, letterSpacing: -0.2,
          }}>
            Hey, I was just thinking about
          </span>
          <span style={{
            fontFamily: FONT, fontSize: 14,
            color: PAL.accent,
            opacity: cursor ? 0.9 : 0,
            transition: 'opacity 0.08s',
            marginLeft: 1,
          }}>|</span>
        </div>

        {/* Send — greyed out */}
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: 'rgba(124,108,255,0.20)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="rgba(124,108,255,0.7)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7"/>
          </svg>
        </div>
      </div>

      {/* Not sent label */}
      <p style={{
        fontFamily: FONT, fontSize: 11,
        color: 'rgba(168,163,199,0.45)',
        textAlign: 'center',
        margin: '8px 0 0', letterSpacing: 0.4,
        textTransform: 'uppercase',
      }}>
        not sent
      </p>
    </div>
  )
}
