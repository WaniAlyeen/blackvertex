import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { ProjectMeta, Project } from './types/project'

const projectsDir = path.join(process.cwd(), 'public', 'Projects')

export function getAllProjects(): ProjectMeta[] {
  try {
    const folders = fs.readdirSync(projectsDir).filter((f) =>
      fs.statSync(path.join(projectsDir, f)).isDirectory()
    )
    return folders
      .map((folder): ProjectMeta | null => {
        try {
          const filePath = path.join(projectsDir, folder, 'meta.md')
          const raw = fs.readFileSync(filePath, 'utf8')
          const { data } = matter(raw)
          if (!data.title) return null
          return {
            slug: folder,
            title: data.title as string,
            client: (data.client as string) ?? '',
            industry: (data.industry as string) ?? '',
            year: (data.year as string) ?? '',
            vimeoId: (data.vimeoId as string) ?? '',
            thumbnail: `/Projects/${folder}/thumbnail.jpg`,
            tags: (data.tags as string[]) ?? [],
            excerpt: (data.excerpt as string) ?? '',
          }
        } catch {
          return null
        }
      })
      .filter((p): p is ProjectMeta => p !== null)
  } catch {
    return []
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const filePath = path.join(projectsDir, slug, 'meta.md')
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(raw)
    if (!data.title) return null
    const processed = await remark().use(html).process(content)
    return {
      slug,
      title: data.title as string,
      client: (data.client as string) ?? '',
      industry: (data.industry as string) ?? '',
      year: (data.year as string) ?? '',
      vimeoId: (data.vimeoId as string) ?? '',
      thumbnail: `/Projects/${slug}/thumbnail.jpg`,
      tags: (data.tags as string[]) ?? [],
      excerpt: (data.excerpt as string) ?? '',
      content: processed.toString(),
    }
  } catch {
    return null
  }
}
