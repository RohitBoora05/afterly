import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = join(__dirname, '..', 'content', 'posts')
const OUT_FILE  = join(__dirname, '..', 'content', 'posts-index.json')

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const lines = match[1].split('\n')
  const data = {}
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) { i++; continue }
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()
    // Handle YAML block scalars (> folded, | literal)
    if (value === '>' || value === '|') {
      const isLiteral = value === '|'
      const blockLines = []
      i++
      while (i < lines.length && (lines[i].startsWith(' ') || lines[i].startsWith('\t'))) {
        blockLines.push(lines[i].trim())
        i++
      }
      while (blockLines.length && blockLines[blockLines.length - 1] === '') blockLines.pop()
      value = isLiteral ? blockLines.join('\n') : blockLines.join(' ')
    } else {
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      i++
    }
    if (key) data[key] = value
  }
  return data
}

const files = readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'))

const index = files.map(filename => {
  const raw = readFileSync(join(POSTS_DIR, filename), 'utf8')
  const data = parseFrontmatter(raw)
  const baseName = filename.replace('.md', '')
  return {
    title:       data.title       || baseName,
    slug:        data.slug        || baseName,
    date:        data.date        || '',
    publishDate: data.publishDate || '',
    readTime:    data.readTime    || '',
    excerpt:     data.excerpt     || '',
  }
})

writeFileSync(OUT_FILE, JSON.stringify(index, null, 2))
console.log(`posts-index.json written — ${index.length} posts`)
