import { Task } from "../types/types"

const STORAGE_KEY = 'tasks'

const getTasks = (): Task[] => {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw ? JSON.parse(raw) : []
}

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}

export const TaskApi = {
  getAll(): Task[] {
    return getTasks()
  },

  add(task: Task): void {
    const tasks = getTasks()
    if (tasks.find(t => t.name === task.name)) {
      alert("Task already exists")
      return
    }
    tasks.push(task)
    saveTasks(tasks)
  },

  delete(id: number): void {
    const tasks = getTasks().filter(t => t.id !== id)
    saveTasks(tasks)
  },

  update(updated: Task): void {
    const tasks = getTasks().map(t => t.id === updated.id ? updated : t)
    saveTasks(tasks)
  },

  getById(id: number): Task | undefined {
    return getTasks().find(t => t.id === id)
  },

  getByStoryId(storyId: number): Task[] {
    return getTasks().filter(t => t.storyId === storyId)
  }
}
