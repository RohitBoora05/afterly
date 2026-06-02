import { useState } from 'react'
import { PAL, FONT } from '../tokens'

export default function CTAButton({ children, small = false, onClick }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: small ? '10px 22px' : '15px 28px',
        borderRadius: 999,
        background: PAL.btnBg,
        border: 'none',
        color: PAL.white,
        fontFamily: FONT,
        fontSize: small ? 13 : 15, fontWeight: 600,
        letterSpacing: -0.2,
        cursor: 'pointer',
        boxShadow: '0 8px 28px rgba(124,108,255,0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'transform 200ms, box-shadow 200ms',
      }}
    >
      {children}
    </button>
  )
}
