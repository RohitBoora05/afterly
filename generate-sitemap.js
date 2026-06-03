import { writeFileSync } from 'fs'
import { posts } from './src/data/posts.js'

const BASE = 'https://afterly.app'

const staticPages = [
  { loc: '/',          changefreq: 'weekly',  priority: '1.0' },
  { loc: '/blog',      changefreq: 'weekly',  priority: '0.9' },
  { loc: '/resources', changefreq: 'monthly', priority: '0.8' },
  { loc: '/support',   changefreq: 'monthly', priority: '0.5' },
  { loc: '/privacy',   changefreq: 'yearly',  priority: '0.3' },
  { loc: '/terms',     changefreq: 'yearly',  priority: '0.3' },
]

const blogPages = posts.map(p => ({
  loc: `/blog/${p.slug}`,
  changefreq: 'monthly',
  priority: '0.7',
  lastmod: p.date,
}))

const allPages = [...staticPages, ...blogPages]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${BASE}${p.loc}</loc>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ''}
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>
`

writeFileSync('./public/sitemap.xml', xml)
console.log(`Sitemap generated: ${allPages.length} URLs (${blogPages.length} blog posts)`)
