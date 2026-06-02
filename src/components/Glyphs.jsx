import { PAL } from '../tokens'

export function GlyphMoon({ size = 22, color = PAL.lavender }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
    </svg>
  )
}

export function GlyphLoop({ size = 22, color = PAL.lavender }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12a8 8 0 0 1 14-5.3" />
      <path d="M20 12a8 8 0 0 1-14 5.3" />
      <path d="M18 3v4h-4" />
      <path d="M6 21v-4h4" />
    </svg>
  )
}

export function GlyphStreak({ size = 22, color = PAL.lavender }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 18l4-6 4 3 5-9 3 6" />
      <circle cx="20" cy="12" r="1" fill={color} stroke="none" />
    </svg>
  )
}

export function GlyphAppStore({ size = 18, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.05 12.5c-.03-2.85 2.33-4.22 2.43-4.29-1.32-1.94-3.39-2.21-4.12-2.24-1.76-.18-3.43 1.03-4.32 1.03-.9 0-2.27-1-3.73-.97-1.92.03-3.69 1.12-4.68 2.83-2 3.46-.51 8.59 1.43 11.4.95 1.37 2.09 2.91 3.59 2.86 1.44-.06 1.99-.93 3.73-.93s2.23.93 3.76.9c1.55-.03 2.53-1.4 3.48-2.78 1.1-1.6 1.55-3.15 1.57-3.23-.04-.02-3.01-1.16-3.04-4.58zM14.27 4.16c.79-.96 1.32-2.29 1.18-3.62-1.13.05-2.5.76-3.32 1.71-.73.84-1.37 2.19-1.2 3.5 1.27.1 2.55-.64 3.34-1.59z"/>
    </svg>
  )
}
