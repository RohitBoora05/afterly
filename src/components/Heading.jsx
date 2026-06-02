import { PAL, FONT } from '../tokens'

export default function Heading({ children, size, color = PAL.white, as: Tag = 'h2', style = {} }) {
  return (
    <Tag style={{
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: '-0.035em',
      lineHeight: 1.08,
      color,
      margin: 0,
      textWrap: 'balance',
      ...style,
    }}>
      {children}
    </Tag>
  )
}
