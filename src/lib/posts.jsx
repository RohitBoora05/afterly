import { marked } from 'marked'

const markdownFiles = import.meta.glob('../../content/posts/*.md', { query: '?raw', import: 'default', eager: true })

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

function parsePost(raw, filepath) {
  const { data, content } = parseFrontmatter(raw)
  const filename = filepath.split('/').pop().replace('.md', '')
  const html = marked(content)
  return {
    ...data,
    html,
    slug: data.slug || filename,
  }
}

export const posts = Object.entries(markdownFiles).map(([path, raw]) => parsePost(raw, path))

export function isPublished(post) {
  if (!post.publishDate) return true
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  return new Date(post.publishDate) <= today
}
