import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'

export async function markdownToHtml(markdown: string): Promise<string> {
  // Fix double-prefixed headings like "## # Introduction" → "## Introduction"
  const cleaned = markdown
    .replace(/^(#{1,6})\s*#\s+/gm, '$1 ')

  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(cleaned)
  return result.toString()
}
