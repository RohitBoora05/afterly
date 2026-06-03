import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Glow from '../components/Glow'
import Grain from '../components/Grain'
import Heading from '../components/Heading'
import { PAL, FONT } from '../tokens'

function Section({ title, children, mobile }) {
  return (
    <div style={{
      paddingTop: mobile ? 36 : 44,
      borderTop: `1px solid ${PAL.cardBorder}`,
      marginTop: mobile ? 36 : 44,
    }}>
      <p style={{
        fontFamily: FONT, fontSize: 11, fontWeight: 600,
        color: PAL.accent, letterSpacing: 2, textTransform: 'uppercase',
        margin: '0 0 24px',
      }}>{title}</p>
      {children}
    </div>
  )
}

function ResourceItem({ name, description, href, external = true }) {
  const style = { display: 'block', textDecoration: 'none', marginBottom: 22 }
  const content = (
    <>
      <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: PAL.lavender, margin: '0 0 5px' }}>
        {name} {external && <span style={{ color: PAL.accent, fontSize: 12 }}>↗</span>}
      </p>
      <p style={{ fontFamily: FONT, fontSize: 14, color: PAL.muted, margin: 0, lineHeight: 1.65 }}>
        {description}
      </p>
    </>
  )
  if (href?.startsWith('/')) return <Link to={href} style={style}>{content}</Link>
  return <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{content}</a>
}

const URGE_STEPS = [
  {
    n: '01',
    title: 'Put the phone down. Physically.',
    body: 'Not face-down on the table. In another room. The goal is friction. Every second of distance helps.',
  },
  {
    n: '02',
    title: 'Write everything you want to say.',
    body: 'In notes, a journal, anywhere. Say all of it. The point is getting it out of your system — not into their inbox.',
  },
  {
    n: '03',
    title: 'Breathe. Slowly.',
    body: '4 counts in. Hold 4. Out 4. Repeat for 2 minutes. This is not a cliché — it physically slows your nervous system down.',
  },
  {
    n: '04',
    title: 'Move your body.',
    body: 'Walk around your place. Drink a glass of water. Step outside for 60 seconds. The urge lives in stillness.',
  },
  {
    n: '05',
    title: 'Wait 20 minutes.',
    body: "The urge peaks fast and fades fast. Most people who wait 20 minutes don't send it. You just need to outlast the peak.",
  },
]

const SCIENCE = [
  {
    heading: 'Your brain is in withdrawal.',
    text: 'A 2010 study published in the Journal of Neurophysiology found that romantic rejection activates the same brain regions as cocaine craving — specifically the reward and motivation circuits. You are not being dramatic. You are going through withdrawal.',
  },
  {
    heading: 'The urge peaks at 72 hours.',
    text: "The intensity of the craving to reach out is highest in the first three days. After that, it begins to fade — as long as you don't reset it by making contact. Every time you text them, you restart the clock.",
  },
  {
    heading: 'It takes about 66 days to break a habit.',
    text: 'Research from University College London found that forming a new automatic behaviour takes an average of 66 days. Breaking the habit of reaching for your phone takes the same. This is why no contact is measured in weeks and months, not days.',
  },
  {
    heading: 'Pain and rejection share the same circuits.',
    text: "Social rejection is processed in the same brain regions as physical pain. What you're feeling is not metaphorical. It is neurologically real. It will also pass — the same way physical pain does.",
  },
]

export default function Resources() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: PAL.bg, paddingTop: mobile ? 52 : 68 }}>
      <Grain />
      <Helmet>
        <title>Resources — afterly | What actually helps after a breakup</title>
        <meta name="description" content="Science-backed resources for no contact and breakup recovery. What to do when the urge hits, books, podcasts, and the neuroscience of heartbreak." />
        <meta property="og:title" content="Breakup Recovery Resources — afterly" />
        <meta property="og:description" content="Science-backed resources for no contact and breakup recovery. No affiliate links. Just stuff worth knowing." />
        <meta property="og:url" content="https://useafterly.com/resources" />
        <link rel="canonical" href="https://useafterly.com/resources" />
      </Helmet>
      <Nav mobile={mobile} />
      <Glow x="50%" y="25%" size={mobile ? 400 : 700} intensity={0.15} />

      <main style={{
        position: 'relative', zIndex: 2,
        maxWidth: 960, margin: '0 auto',
        padding: mobile ? '48px 24px 80px' : '100px 56px 100px',
      }}>
        <p style={{
          fontFamily: FONT, fontSize: 11, fontWeight: 600,
          color: PAL.accent, letterSpacing: 2, textTransform: 'uppercase',
          margin: '0 0 16px',
        }}>
          Resources
        </p>
        <Heading as="h1" size={mobile ? 32 : 48} style={{ marginBottom: 16 }}>
          Things that actually help.
        </Heading>
        <p style={{
          fontFamily: FONT, fontSize: mobile ? 15 : 16,
          color: PAL.muted, lineHeight: 1.7, margin: 0,
        }}>
          A list of genuinely useful things for people going through a breakup. No affiliate links. No ranking. Just stuff worth knowing about.
        </p>

        {/* 1. When the urge hits */}
        <Section title="When the urge hits" mobile={mobile}>
          <p style={{ fontFamily: FONT, fontSize: mobile ? 14 : 15, color: PAL.muted, lineHeight: 1.7, margin: '0 0 28px' }}>
            You know you shouldn't text them. You're going to anyway unless something interrupts the pattern. Here's the interrupt.
          </p>
          {URGE_STEPS.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, marginBottom: i === URGE_STEPS.length - 1 ? 0 : 24 }}>
              <div style={{ fontFamily: FONT, fontSize: 11, fontWeight: 700, color: PAL.accent, letterSpacing: 1, minWidth: 24, paddingTop: 2, flexShrink: 0 }}>
                {step.n}
              </div>
              <div>
                <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: PAL.lavender, margin: '0 0 5px' }}>{step.title}</p>
                <p style={{ fontFamily: FONT, fontSize: 14, color: PAL.muted, margin: 0, lineHeight: 1.65 }}>{step.body}</p>
              </div>
            </div>
          ))}
        </Section>

        {/* 2. Understanding */}
        <Section title="Understanding what's happening to you" mobile={mobile}>
          <p style={{ fontFamily: FONT, fontSize: mobile ? 14 : 15, color: PAL.muted, lineHeight: 1.7, margin: '0 0 20px' }}>
            What you're feeling isn't weakness. It has a biological explanation — and understanding it makes it slightly easier to survive.
          </p>
          {SCIENCE.map((item, i) => (
            <div key={i} style={{ marginBottom: i === SCIENCE.length - 1 ? 0 : 20 }}>
              <p style={{ fontFamily: FONT, fontSize: 15, fontWeight: 600, color: PAL.lavender, margin: '0 0 5px' }}>{item.heading}</p>
              <p style={{ fontFamily: FONT, fontSize: 14, color: PAL.muted, margin: 0, lineHeight: 1.65 }}>{item.text}</p>
            </div>
          ))}
        </Section>

        {/* 3. Books */}
        <Section title="Books" mobile={mobile}>
          <ResourceItem
            name="Attached — Amir Levine & Rachel Heller"
            description="The most important book for understanding why breakups hurt the way they do. Explains attachment theory in plain language. Read this first."
            href="https://www.google.com/search?q=Attached+Amir+Levine+Rachel+Heller+book"
          />
          <ResourceItem
            name="Getting Past Your Breakup — Susan Elliott"
            description="The most practical guide in the category. Not therapy-speak, not toxic positivity. Actually useful step by step."
            href="https://www.google.com/search?q=Getting+Past+Your+Breakup+Susan+Elliott+book"
          />
          <ResourceItem
            name="How to Fix a Broken Heart — Guy Winch"
            description="Short, science-backed, compassionate. By the psychologist behind the TED Talk on heartbreak. Good for understanding the psychology of what's happening."
            href="https://www.google.com/search?q=How+to+Fix+a+Broken+Heart+Guy+Winch+book"
          />
          <ResourceItem
            name="It's Called a Breakup Because It's Broken — Greg Behrendt"
            description="Honest, direct, a little funny. Good for moments when you need someone to tell you the truth without being cruel."
            href="https://www.google.com/search?q=Its+Called+a+Breakup+Because+Its+Broken+Greg+Behrendt+book"
          />
        </Section>

        {/* 4. Podcasts */}
        <Section title="Podcasts" mobile={mobile}>
          <ResourceItem
            name="Where Should We Begin? — Esther Perel"
            description="Real couples therapy sessions. Helps you understand what actually happened in your relationship — and why. Not breakup-specific but one of the best things you can listen to."
            href="https://www.estherperel.com/podcast"
          />
          <ResourceItem
            name="We Can Do Hard Things — Glennon Doyle"
            description="About navigating life's most difficult moments. Grief, loss, rebuilding. Warm, honest, doesn't pretend things are fine when they're not."
            href="https://www.youtube.com/@WeCanDoHardThingsShow"
          />
          <ResourceItem
            name="The Mel Robbins Podcast"
            description="Practical tools for getting through hard stretches. Good for the moments when you need someone to help you move, not just feel."
            href="https://www.melrobbins.com/podcast"
          />
        </Section>

        {/* 5. Blog */}
        <Section title="From the afterly blog" mobile={mobile}>
          <ResourceItem
            name="Why No Contact Is So Hard (And What Actually Helps)"
            description="Most people know what they should do. This is about why they can't make themselves do it — and what actually works."
            href="/blog/why-no-contact-is-so-hard"
            external={false}
          />
        </Section>

        {/* 6. The app */}
        <Section title="The app" mobile={mobile}>
          <ResourceItem
            name="afterly"
            description="Built for the moments when knowing what you should do isn't enough. Urge button, unsent vault, streak tracker. Free to try on iPhone."
            href="https://apps.apple.com/us/app/afterly-no-contact-recovery/id6762640667"
          />
        </Section>

        {/* 8. Crisis — last */}
        <Section title="If tonight is hard" mobile={mobile}>
          <ResourceItem
            name="Crisis helplines — findahelpline.com"
            description="International directory. Detects your country and shows the right local line. Free, available 24/7."
            href="https://findahelpline.com"
          />
        </Section>
      </main>

      <Footer mobile={mobile} />
    </div>
  )
}
