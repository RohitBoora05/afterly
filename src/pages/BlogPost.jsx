import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams, Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AppStoreButton from '../components/AppStoreButton'
import Glow from '../components/Glow'
import Grain from '../components/Grain'
import { fetchAllPosts, fetchPost, isPublished } from '../lib/posts.jsx'
import { PAL, FONT } from '../tokens'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

function getRelated(current, all, count = 3) {
  const stopWords = new Set(['the','and','why','how','to','is','a','an','your','you','do','did','does','after','when','can','i','my','they','their','it','be','so','are','was','were','with','for','of','in','on','at','but','not','have','has','what','get','who'])
  const tokenize = str => str.toLowerCase().split(/[-\s]+/).filter(w => w.length > 2 && !stopWords.has(w))
  const currentTokens = new Set(tokenize(current.slug + ' ' + current.title))
  return all
    .filter(p => p.slug !== current.slug)
    .map(p => {
      const tokens = tokenize(p.slug + ' ' + p.title)
      const overlap = tokens.filter(t => currentTokens.has(t)).length
      return { post: p, score: overlap }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(x => x.post)
}

function RelatedPosts({ current, allPosts, mobile }) {
  const related = getRelated(current, allPosts)
  if (!related.length) return null
  return (
    <div style={{ marginTop: 64, paddingTop: 40, borderTop: `1px solid ${PAL.cardBorder}` }}>
      <p style={{
        fontFamily: FONT, fontSize: 11, fontWeight: 600,
        color: PAL.accent, letterSpacing: 2, textTransform: 'uppercase',
        margin: '0 0 24px',
      }}>Related reading</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {related.map(p => (
          <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '16px 20px',
              border: `1px solid ${PAL.cardBorder}`,
              borderRadius: 12,
              transition: 'border-color 0.15s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,108,255,0.35)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = PAL.cardBorder}
            >
              <p style={{
                fontFamily: FONT, fontSize: mobile ? 14 : 15, fontWeight: 600,
                color: PAL.lavender, margin: '0 0 6px', lineHeight: 1.35,
              }}>{p.title}</p>
              <p style={{
                fontFamily: FONT, fontSize: 13, color: PAL.mutedSoft,
                margin: 0, lineHeight: 1.5,
              }}>{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  const [post, setPost] = useState(null)
  const [allPosts, setAllPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    Promise.all([fetchAllPosts(), fetchPost(slug)]).then(([all, fullPost]) => {
      setAllPosts(all)
      // Check publishDate against the index entry (has publishDate; fullPost may not)
      const meta = all.find(p => p.slug === slug)
      if (!fullPost || !meta || !isPublished(meta)) {
        setNotFound(true)
      } else {
        setPost(fullPost)
      }
    }).finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0D0B18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#888', fontFamily: 'sans-serif' }}>Loading…</p>
    </div>
  )

  if (notFound) return <Navigate to="/blog" replace />

  return (
    <div style={{ minHeight: '100vh', background: PAL.bg, paddingTop: mobile ? 52 : 68, overflowX: 'hidden', position: 'relative' }}>
      <Helmet>
        <title>{post.title} — afterly Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} — afterly Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://useafterly.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <link rel="canonical" href={`https://useafterly.com/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "datePublished": post.date,
          "publisher": { "@type": "Organization", "name": "afterly", "url": "https://useafterly.com" },
          "url": `https://useafterly.com/blog/${post.slug}`
        })}</script>
      </Helmet>
      <Grain />
      <Nav mobile={mobile} />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 500, overflow: 'hidden', pointerEvents: 'none' }}>
        <Glow x="60%" y="20%" size={mobile ? 400 : 700} intensity={0.18} />
      </div>

      <main style={{
        position: 'relative', zIndex: 2,
        maxWidth: 680, margin: '0 auto',
        padding: mobile ? '40px 24px 80px' : '72px 24px 100px',
      }}>
        {/* Back */}
        <Link to="/blog" style={{
          fontFamily: FONT, fontSize: 13, color: PAL.muted,
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
          marginBottom: 40, letterSpacing: -0.1,
        }}>
          ← All posts
        </Link>

        {/* Meta */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          fontFamily: FONT, fontSize: 12, color: PAL.mutedSoft,
          letterSpacing: 0.2, marginBottom: 20,
        }}>
          <span>{formatDate(post.date)}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: PAL.mutedSoft }} />
          <span>{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: FONT, fontWeight: 700,
          fontSize: mobile ? 28 : 42,
          color: PAL.white, letterSpacing: '-0.03em',
          lineHeight: 1.15, margin: '0 0 40px',
        }}>
          {post.title}
        </h1>

        {/* Content */}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
          style={{
            fontFamily: FONT, fontSize: mobile ? 16 : 17,
            color: PAL.muted, lineHeight: 1.8,
            letterSpacing: -0.1,
          }}
        />

        <RelatedPosts current={post} allPosts={allPosts} mobile={mobile} />

        {/* CTA */}
        <div style={{
          marginTop: 64,
          paddingTop: 40,
          borderTop: `1px solid ${PAL.cardBorder}`,
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: FONT, fontSize: mobile ? 14 : 15,
            color: PAL.muted, lineHeight: 1.65, margin: '0 0 24px',
            fontStyle: 'italic',
          }}>
            If you're in the middle of this and need something to hold the line on the hard nights, afterly was built for exactly this.
          </p>
          <AppStoreButton label={
            <span>Try free on the <span style={{ fontSize: '1.1em', fontWeight: 700 }}>App Store</span></span>
          } />
        </div>
      </main>

      <Footer mobile={mobile} />
    </div>
  )
}
