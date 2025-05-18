import { Task } from '../types/types';

const API_BASE = '/api/tasks'

export const TaskApi = {
  async getAll(): Promise<Task[]> {
    const res = await fetch(API_BASE)
    if (!res.ok) throw new Error('Failed to fetch tasks')
    return res.json()
  },

  async getByStoryId(storyId: string): Promise<Task[]> {
    const res = await fetch(`${API_BASE}?storyId=${storyId}`) ////
    if (!res.ok) throw new Error('Failed to fetch tasks by storyId')
    return res.json()
  },

  async add(task: Task): Promise<Task> {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    if (!res.ok) throw new Error('Failed to add task')
    return res.json()
  },

  async update(task: Task): Promise<Task> {
    if (!task.id) throw new Error('No id to update');
    const res = await fetch(`${API_BASE}/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
    if (!res.ok) throw new Error('Failed to update task')
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete task')
  },

  async getById(id: string): Promise<Task | null> {
    const res = await fetch(`${API_BASE}/${id}`)
    if (res.status === 404) { return null }
    if (!res.ok) throw new Error('Failed to fetch task')
    return res.json()
  },
};