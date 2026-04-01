export interface ProjectMeta {
  slug: string
  title: string
  client: string
  industry: string
  year: string
  vimeoId: string
  thumbnail: string
  tags: string[]
  excerpt: string
}

export interface Project extends ProjectMeta {
  content: string
}
