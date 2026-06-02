import { PAL } from '../tokens'

export default function Glow({ x = '50%', y = '50%', size = 800, intensity = 0.55, hue = PAL.accent }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)',
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle, ${hue} 0%, transparent 60%)`,
      opacity: intensity,
      filter: 'blur(40px)',
      pointerEvents: 'none',
      zIndex: 0,
    }} />
  )
}
