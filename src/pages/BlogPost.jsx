import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams, Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import AppStoreButton from '../components/AppStoreButton'
import Glow from '../components/Glow'
import Grain from '../components/Grain'
import { posts } from '../data/posts'
import { PAL, FONT } from '../tokens'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default function BlogPost() {
  const { slug } = useParams()
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  const post = posts.find(p => p.slug === slug)
  if (!post) return <Navigate to="/blog" replace />

  return (
    <div style={{ minHeight: '100vh', background: PAL.bg, paddingTop: mobile ? 52 : 68 }}>
      <Helmet>
        <title>{post.title} — afterly Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={`${post.title} — afterly Blog`} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={`https://afterly.app/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <link rel="canonical" href={`https://afterly.app/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "description": post.excerpt,
          "datePublished": post.date,
          "publisher": { "@type": "Organization", "name": "afterly", "url": "https://afterly.app" },
          "url": `https://afterly.app/blog/${post.slug}`
        })}</script>
      </Helmet>
      <Grain />
      <Nav mobile={mobile} />

      <Glow x="60%" y="20%" size={mobile ? 400 : 700} intensity={0.18} />

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
        <div style={{
          fontFamily: FONT, fontSize: mobile ? 16 : 17,
          color: PAL.muted, lineHeight: 1.8,
          letterSpacing: -0.1,
        }}>
          {post.content.split('\n\n').map((para, i) => (
            <p key={i} style={{ margin: '0 0 24px' }}>{para}</p>
          ))}
        </div>

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
