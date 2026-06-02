import { PAL, FONT } from '../tokens'

// Renders text directly at correct size — no transform scaling, no blur
export default function AfterlyIcon({ size = 64 }) {
  const r = Math.round(size * 0.225)
  const fontSize = Math.round(size * 0.255)
  const letterSpacing = -(size * 0.014)

  return (
    <div style={{
      width: size, height: size, background: PAL.bg,
      borderRadius: r, overflow: 'hidden',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 40px rgba(124,108,255,0.18), inset 0 0 0 1px rgba(230,225,255,0.06)',
      flexShrink: 0,
    }}>
      <div style={{
        fontFamily: FONT, fontWeight: 700,
        fontSize: fontSize,
        letterSpacing: letterSpacing,
        lineHeight: 1, whiteSpace: 'nowrap',
      }}>
        <span style={{ color: PAL.lavender }}>after</span>
        <span style={{ color: PAL.accent }}>ly</span>
      </div>
    </div>
  )
}
