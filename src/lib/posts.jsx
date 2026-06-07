import { marked } from 'marked'

const REPO = 'krish10007/afterly-landing'
const BRANCH = 'main'
const POSTS_DIR = 'content/posts'

// Module-level cache — persists for the browser session
let cache = null

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

function parsePost(raw, filename) {
  const { data, content } = parseFrontmatter(raw)
  const baseName = filename.replace('.md', '')
  const html = marked(content)
  return {
    ...data,
    html,
    slug: data.slug || baseName,
  }
}

export async function fetchAllPosts() {
  if (cache) return cache

  // 1. Get list of .md files from GitHub API
  const listRes = await fetch(
    `https://api.github.com/repos/${REPO}/contents/${POSTS_DIR}?ref=${BRANCH}`
  )
  if (!listRes.ok) throw new Error(`Failed to fetch post list: ${listRes.status}`)
  const files = await listRes.json()
  const mdFiles = files.filter(f => f.name.endsWith('.md'))

  // 2. Fetch all files in parallel from raw CDN (not rate-limited)
  const posts = await Promise.all(
    mdFiles.map(async file => {
      const rawRes = await fetch(
        `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${POSTS_DIR}/${file.name}`
      )
      if (!rawRes.ok) return null
      const raw = await rawRes.text()
      return parsePost(raw, file.name)
    })
  )

  cache = posts.filter(Boolean)
  return cache
}

export async function fetchPost(slug) {
  // Use cache if available
  if (cache) {
    return cache.find(p => p.slug === slug) || null
  }
  // Otherwise fetch all (populates cache) and find
  const all = await fetchAllPosts()
  return all.find(p => p.slug === slug) || null
}

export function isPublished(post) {
  if (!post.publishDate) return true
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return new Date(post.publishDate) <= today
}
