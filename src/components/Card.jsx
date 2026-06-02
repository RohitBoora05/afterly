import { PAL } from '../tokens'

export default function Card({ children, padding = 32, style = {} }) {
  return (
    <div style={{
      background: PAL.cardFill,
      border: `1px solid ${PAL.cardBorder}`,
      borderRadius: 18,
      padding,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      position: 'relative',
      ...style,
    }}>
      {children}
    </div>
  )
}
