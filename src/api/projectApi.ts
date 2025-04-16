import { Project } from '../types/types'

const STORAGE_KEY = 'projects'
const ACTIVE_PROJECT_KEY = 'activeProject'

const getProjects = (): Project[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
}

export const ProjectApi = {
  getAll(): Project[] {
    return getProjects()
  },

  add(project: Project): void {
    const projects = getProjects()
    if (projects.find(p => p.name === project.name)) {
      alert("Project already exists")
      return
    }
    projects.push(project)
    saveProjects(projects)
  },

  delete(id: number): void {
    const projects = getProjects().filter(p => p.id !== id)
    saveProjects(projects)
  },

  update(updated: Project): void {
    const projects = getProjects().map(p => p.id === updated.id ? updated : p)
    saveProjects(projects)
  },

  getById(id: number): Project | undefined {
    return getProjects().find(p => p.id === id)
  },

  async setActiveProject(id: number): Promise<void> {
    localStorage.setItem(ACTIVE_PROJECT_KEY, id.toString())
    console.log("Project with id " + id + " was set as active")
  },

  async getActiveProject(): Promise<Project | null> {
    const id: string | null = localStorage.getItem(ACTIVE_PROJECT_KEY)
    if (id) {
      const projects: Project[] = getProjects()
      return projects.find(p => p.id === parseInt(id)) || null
    }
    return null
  },

  async unactiveProject(): Promise<void> {
    localStorage.removeItem(ACTIVE_PROJECT_KEY)
    console.log("Active project was removed")
  }
}
