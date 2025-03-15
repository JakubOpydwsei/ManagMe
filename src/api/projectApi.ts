export type Project = {
    id: number
    name: string
    desc: string
}


export type Story = {
    id: number
    name: string
    desc: string
    priority: "low" | "medium" | "high"
    project_id: number
    date: string
    status: "todo" | "doing" | "done"
    owner: number
}

export type Task ={
    id: number
    name: string
    desc: string
    priority: "low" | "medium" | "high"
    storyId: number
    workingHours: number

    status: "todo" | "doing" | "done"
    user?: number //?
    startDate?: string //?
    endDate?: string //?

    addDate: string

}

class ProjectApi {

    static getProjects(): Project[] {
        const projects: string | null = localStorage.getItem('projects')
        return projects ? JSON.parse(projects) : [] as Project[]
    }

    static addProject(project: Project): void {
        const projects: Project[] = this.getProjects()
        if (projects.find(p => p.name === project.name)) {
            alert("Project with name " + project.name + " already exists")
            return
        }
        projects.push(project)
        localStorage.setItem('projects', JSON.stringify(projects))

        console.log("Project added, id: " + project.id + ", name: " + project.name + ", desc: " + project.desc)
    }

    static deleteProject(id: number): void {
        let projects: Project[] = this.getProjects()
        projects = projects.filter(p => p.id !== id)
        localStorage.setItem('projects', JSON.stringify(projects))
        console.log("Project with id " + id + " was deleted successfully")
    }

    static editProject(project: Project): void {
        const projects: Project[] = this.getProjects()
        const index = projects.findIndex(p => p.id === project.id)
        projects[index] = project
        localStorage.setItem('projects', JSON.stringify(projects))
        console.log("Project with id " + project.id + " was edited successfully")
    }

    static getProjectById(id: number): Project {
        const projects: Project[] = this.getProjects()
        return projects.find(p => p.id === id)!
    }

    static setActiveProject(id: number): void {
        localStorage.setItem('activeProject', id.toString())
        console.log("Project with id " + id + " was set as active")
    }

    static getActiveProject(): Project | null {
        const id: string | null = localStorage.getItem('activeProject')
        if (id) {
            const projects: Project[] = this.getProjects()
            return projects.find(p => p.id === parseInt(id))!
        }
        return null
    }

    static unactiveProject(): void {
        localStorage.removeItem('activeProject')
        console.log("Active project was removed")
    }

    static getStories(): Story[] {
        const stories: string | null = localStorage.getItem('stories')
        return stories ? JSON.parse(stories) : [] as Story[]
    }

    static addStory(story: Story): void {
        const stories: Story[] = this.getStories()
        if (stories.find(s => s.name === story.name)) {
            alert("Story with name " + story.name + " already exists")
            return
        }
        stories.push(story)
        localStorage.setItem('stories', JSON.stringify(stories))
        console.log("Story added, id: " + story.id + ", name: " + story.name + ", desc: " + story.desc)
    }

    static deleteStory(id: number): void {
        let stories: Story[] = this.getStories()
        stories = stories.filter(s => s.id !== id)
        localStorage.setItem('stories', JSON.stringify(stories))
        console.log("Story with id " + id + " was deleted successfully")
    }

    static editStory(story: Story): void {
        const stories: Story[] = this.getStories()
        const index = stories.findIndex(s => s.id === story.id)
        stories[index] = story
        localStorage.setItem('stories', JSON.stringify(stories))
        console.log("Story with id " + story.id + " was edited successfully")
    }

    static getStoryById(id: number): Story {
        const stories: Story[] = this.getStories()
        return stories.find(s => s.id === id)!
    }

    static getStoriesByProjectId(project_id: number): Story[] {
        const stories: Story[] = this.getStories()
        return stories.filter(s => s.project_id === project_id)
    }

    static getStoriesByProjectIdAndStatus(project_id: number, status: 'todo' | 'doing' | 'done'): Story[] {
        const stories: Story[] = this.getStoriesByProjectId(project_id)
        return stories.filter(s => s.status === status)
    }

    static getTasks(): Task[] {
        const tasks: string | null = localStorage.getItem('tasks')
        return tasks ? JSON.parse(tasks) : [] as Task[]
    }

    static addTask(task: Task): void {
        const tasks: Task[] = this.getTasks()
        if (tasks.find(t => t.name === task.name)) {
            alert("Task with name " + task.name + " already exists")
            return
        }
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    static getTaskById(taskId: number): Task {
        const tasks: Task[] = this.getTasks() as Task[]
        return tasks.find(t => t.id === taskId)!
    }

    static getTasksByStoryId(storyId: number): Task[] {
        const tasks: Task[] = this.getTasks()
        return tasks.filter(t => t.storyId === storyId)
    }

    static deleteTask(name: string): void {
        let tasks: Task[] = this.getTasks()
        tasks = tasks.filter(t => t.name !== name)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        console.log("Task with name " + name + " was deleted successfully")
    }

    static editTask(task: Task): void {
        const tasks: Task[] = this.getTasks()
        const index = tasks.findIndex(t => t.id === task.id)
        tasks[index] = task
        localStorage.setItem('tasks', JSON.stringify(tasks))
        console.log("Task with name " + task.id + " was edited successfully")
    }
}

export default ProjectApi;