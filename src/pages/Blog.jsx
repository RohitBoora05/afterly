import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Glow from '../components/Glow'
import Grain from '../components/Grain'
import Heading from '../components/Heading'
import AfterlyWordmark from '../components/AfterlyWordmark'
import { fetchAllPosts, isPublished } from '../lib/posts.jsx'
import { PAL, FONT } from '../tokens'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default function Blog() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    fetchAllPosts()
      .then(setPosts)
      .finally(() => setLoading(false))
  }, [])

  const sorted = [...posts]
    .filter(isPublished)
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div style={{ minHeight: '100vh', background: PAL.bg, paddingTop: mobile ? 52 : 68, overflowX: 'hidden' }}>
      <Grain />
      <Helmet>
        <title>Blog — afterly | Honest writing about heartbreak and healing</title>
        <meta name="description" content="No toxic positivity. No '10 tips' lists. Real writing about what no contact actually feels like and what actually helps." />
        <meta property="og:title" content="afterly Blog — Honest writing about heartbreak and healing" />
        <meta property="og:description" content="Real writing about no contact, breakup recovery, and what actually helps." />
        <meta property="og:url" content="https://useafterly.com/blog" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://useafterly.com/blog" />
      </Helmet>
      <Nav mobile={mobile} />

      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <Glow x="60%" y="30%" size={mobile ? 500 : 900} intensity={0.2} />
        <div style={{
          position: 'relative', zIndex: 2,
          maxWidth: 960, margin: '0 auto',
          padding: mobile ? '48px 24px 32px' : '100px 56px 56px',
        }}>
          <p style={{
            fontFamily: FONT, fontSize: 11, fontWeight: 600,
            color: PAL.accent, letterSpacing: 2, textTransform: 'uppercase',
            margin: '0 0 16px',
          }}>
            The afterly blog
          </p>
          <Heading as="h1" size={mobile ? 34 : 52}>
            Honest writing about<br />
            <span style={{ color: PAL.muted }}>heartbreak and healing.</span>
          </Heading>
          <p style={{
            fontFamily: FONT, fontSize: mobile ? 15 : 17,
            color: PAL.muted, lineHeight: 1.6, margin: '20px 0 0',
          }}>
            No toxic positivity. No "10 tips" lists. Just real talk about what no contact actually feels like.
          </p>
        </div>
      </section>

      {/* Post list */}
      <div style={{
        maxWidth: 960, margin: '0 auto',
        padding: mobile ? '16px 24px 80px' : '16px 56px 100px',
        position: 'relative', zIndex: 2,
      }}>
        {loading ? (
          <p style={{ fontFamily: FONT, color: PAL.mutedSoft, fontSize: 15 }}>
            Loading posts…
          </p>
        ) : sorted.length === 0 ? (
          <p style={{ fontFamily: FONT, color: PAL.mutedSoft, fontSize: 15 }}>
            First posts coming soon.
          </p>
        ) : (
          sorted.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{
                padding: mobile ? '28px 0' : '36px 0',
                borderBottom: `1px solid ${PAL.cardBorder}`,
                borderTop: i === 0 ? `1px solid ${PAL.cardBorder}` : 'none',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  marginBottom: 12,
                  fontFamily: FONT, fontSize: 12,
                  color: PAL.mutedSoft, letterSpacing: 0.2,
                }}>
                  <span>{formatDate(post.date)}</span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: PAL.mutedSoft }} />
                  <span>{post.readTime}</span>
                </div>
                <Heading as="h2" size={mobile ? 20 : 24}
                  style={{ letterSpacing: '-0.025em', lineHeight: 1.3, marginBottom: 12 }}>
                  {post.title}
                </Heading>
                <p style={{
                  fontFamily: FONT, fontSize: mobile ? 14 : 15,
                  color: PAL.muted, lineHeight: 1.65, margin: 0,
                }}>
                  {post.excerpt}
                </p>
                <p style={{
                  fontFamily: FONT, fontSize: 13, fontWeight: 600,
                  color: PAL.accent, margin: '16px 0 0', letterSpacing: -0.1,
                }}>
                  Read →
                </p>
              </div>
            </Link>
          ))
        )}
      </div>

      <Footer mobile={mobile} />
    </div>
  )
}
