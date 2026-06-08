import { marked } from 'marked'

const REPO       = 'krish10007/afterly-landing'
const BRANCH     = 'main'
const POSTS_DIR  = 'content/posts'
const INDEX_URL  = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/content/posts-index.json`

// Separate caches
let indexCache = null
const postCache = {}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }

  return { data, content: match[2] }
}

// Returns metadata array (no html) — instant from static CDN JSON
export async function fetchAllPosts() {
  if (indexCache) return indexCache

  const res = await fetch(INDEX_URL)
  if (!res.ok) throw new Error(`Failed to fetch posts index: ${res.status}`)
  indexCache = await res.json()
  return indexCache
}

// Returns full post with html — single .md fetch from raw CDN
export async function fetchPost(slug) {
  if (postCache[slug]) return postCache[slug]

  const url = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${POSTS_DIR}/${slug}.md`
  const res = await fetch(url)
  if (!res.ok) return null

  const raw = await res.text()
  const { data, content } = parseFrontmatter(raw)
  const html = marked(content)
  const post = {
    ...data,
    html,
    slug: data.slug || slug,
  }

  postCache[slug] = post
  return post
}

export function isPublished(post) {
  if (!post.publishDate) return true
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return new Date(post.publishDate) <= today
}
