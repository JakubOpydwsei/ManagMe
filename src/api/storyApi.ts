import { Story } from '../types/types'

const STORAGE_KEY = 'stories'

const getStories = (): Story[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

const saveStories = (stories: Story[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stories))
}

export const StoryApi = {
  getAll(): Story[] {
    return getStories()
  },

  add(story: Story): void {
    const stories = getStories()
    if (stories.find(s => s.name === story.name)) {
      alert("Story already exists")
      return
    }
    stories.push(story)
    saveStories(stories)
  },

  delete(id: number): void {
    const stories = getStories().filter(s => s.id !== id)
    saveStories(stories)
  },

  update(updated: Story): void {
    const stories = getStories().map(s => s.id === updated.id ? updated : s)
    saveStories(stories)
  },

  getById(id: number): Story | undefined {
    return getStories().find(s => s.id === id)
  },

  getByProjectId(projectId: number): Story[] {
    return getStories().filter(s => s.project_id === projectId)
  },

  getByProjectAndStatus(projectId: number, status: Story["status"]): Story[] {
    return getStories().filter(s => s.project_id === projectId && s.status === status)
  }
}
