import { Story } from '../types/types'

const API_BASE = '/api/stories'

export const StoryApi = {
  async getAll(): Promise<Story[]> {
    const res = await fetch(API_BASE)
    if (!res.ok) throw new Error('Failed to fetch stories')
    return res.json()
  },

  async add(story: Story): Promise<Story> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story),
    })
    if (!res.ok) throw new Error('Failed to add story')
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete story')
  },

  async update(story: Story): Promise<Story> {
    if (!story.id) throw new Error('No id to update')
    const res = await fetch(`${API_BASE}/${story.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(story),
    })
    if (!res.ok) throw new Error('Failed to update story')
    return res.json()
  },

  async getById(id: string): Promise<Story | null> {
    const res = await fetch(`${API_BASE}/${id}`)
    if (res.status === 404) return null
    if (!res.ok) throw new Error('Failed to fetch story')
    return res.json()
  },

  async getByProjectId(projectId: string): Promise<Story[]> {
    const res = await fetch(`${API_BASE}?project_id=${projectId}`)
    if (!res.ok) throw new Error('Failed to fetch stories by project')
    return res.json()
  },

  async getByProjectAndStatus(projectId: string, status: Story['status']): Promise<Story[]> {
    const res = await fetch(`${API_BASE}?project_id=${projectId}&status=${status}`)
    if (!res.ok) throw new Error('Failed to fetch filtered stories')
    return res.json()
  },
}