import { PAL, FONT } from '../tokens'

export default function AfterlyWordmark({ size = 17 }) {
  return (
    <div style={{
      fontFamily: FONT, fontWeight: 700,
      fontSize: size, letterSpacing: -0.5, lineHeight: 1,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ color: PAL.lavender }}>after</span>
      <span style={{ color: PAL.accent }}>ly</span>
    </div>
  )
}
