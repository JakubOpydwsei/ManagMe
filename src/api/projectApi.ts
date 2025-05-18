import { Project } from '../types/types'

const API_BASE = '/api/projects'
const ACTIVE_PROJECT_KEY = 'activeProjectId'

export const ProjectApi = {
  async getAll(): Promise<Project[]> {
    const res = await fetch(API_BASE)
    if (!res.ok) throw new Error('Failed to fetch projects')
    return res.json()
  },

  async add(project: Project): Promise<Project> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Failed to create project')
    }
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Failed to delete project')
    }

    const activeId = localStorage.getItem(ACTIVE_PROJECT_KEY)
    if (activeId === id) {
      localStorage.removeItem(ACTIVE_PROJECT_KEY)
    }
  },

  async update(project: Project): Promise<Project> {
    const res = await fetch(`${API_BASE}/${project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Failed to update project')
    }
    return res.json()
  },

  async getById(id: string): Promise<Project | null> {
    const res = await fetch(`${API_BASE}/${id}`)
    if (!res.ok) {
      if (res.status === 404) return null
      throw new Error('Failed to fetch project')
    }
    return res.json()
  },

  async getActiveProject(): Promise<Project | null> {
    const activeId = localStorage.getItem(ACTIVE_PROJECT_KEY)
    if (!activeId) return null
    return ProjectApi.getById(activeId)
  },

  setActiveProject(id: string): void {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id)
  },

  unactiveProject(): void {
    localStorage.removeItem(ACTIVE_PROJECT_KEY)
  }
}