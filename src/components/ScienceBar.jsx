import { useState, useEffect } from 'react'
import { PAL, FONT } from '../tokens'

const FACTS = [
  {
    text: "Romantic rejection activates the same brain circuits as cocaine withdrawal.",
    source: "Journal of Neurophysiology, 2010"
  },
  {
    text: "It takes an average of 66 days to break a deeply ingrained habit.",
    source: "University College London"
  },
  {
    text: "Social rejection is processed in the same brain regions as physical pain.",
    source: "Neuroimaging Research, 2012"
  },
  {
    text: "The urge to reach out peaks at 72 hours — then begins to fade.",
    source: "Attachment Recovery Research"
  },
  {
    text: "Maintaining contact with an ex keeps the brain's craving circuits firing.",
    source: "Neuroscience of Heartbreak"
  },
]

export default function ScienceBar({ mobile }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(i => (i + 1) % FACTS.length)
        setVisible(true)
      }, 600)
    }, 7000)
    return () => clearInterval(interval)
  }, [])

  const fact = FACTS[index]

  return (
    <div style={{
      marginTop: mobile ? 36 : 0,
      maxWidth: mobile ? '100%' : 520,
      transition: 'opacity 0.6s ease',
      opacity: visible ? 1 : 0,
    }}>
      <div style={{
        background: 'rgba(124,108,255,0.10)',
        border: `1px solid rgba(124,108,255,0.35)`,
        borderRadius: 14,
        padding: mobile ? '16px 18px' : '18px 24px',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}>
        <p style={{
          fontFamily: FONT, fontSize: mobile ? 13 : 14,
          color: PAL.white, lineHeight: 1.65,
          margin: 0, letterSpacing: 0.1,
          fontStyle: 'italic',
          textAlign: mobile ? 'center' : 'left',
        }}>
          "{fact.text}"
        </p>
        <p style={{
          fontFamily: FONT, fontSize: 11,
          color: 'rgba(124,108,255,0.9)',
          margin: '8px 0 0', letterSpacing: 0.8,
          textTransform: 'uppercase',
          textAlign: mobile ? 'center' : 'left',
        }}>
          — {fact.source}
        </p>
      </div>
    </div>
  )
}
