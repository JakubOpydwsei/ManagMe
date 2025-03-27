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

export type BasicTask = {
    id: number
    name: string
    desc: string
    priority: "low" | "medium" | "high"
    storyId: number
    workingHours: number
    status: "todo" | "doing" | "done"
    addDate: string
}

export type BasicTaskWithUser = BasicTask & {
    user: number
    startDate: string
}

export type CompleteTask = BasicTaskWithUser & {
    endDate: string
}

export type Task = BasicTask | BasicTaskWithUser | CompleteTask

class ProjectApi {

    static async getProjects(): Promise<Project[]> {
        const projects: string | null = localStorage.getItem('projects')
        return projects ? JSON.parse(projects) : [] as Project[]
    }

    static async addProject(project: Project): Promise<void> {
        const projects: Project[] = await this.getProjects()
        if (projects.find(p => p.name === project.name)) {
            alert("Project with name " + project.name + " already exists")
            return
        }
        projects.push(project)
        localStorage.setItem('projects', JSON.stringify(projects))

        console.log("Project added, id: " + project.id + ", name: " + project.name + ", desc: " + project.desc)
    }

    static async deleteProject(id: number): Promise<void> {
        let projects: Project[] = await this.getProjects()
        projects = projects.filter(p => p.id !== id)
        localStorage.setItem('projects', JSON.stringify(projects))
        console.log("Project with id " + id + " was deleted successfully")
    }

    static async editProject(project: Project): Promise<void> {
        const projects: Project[] = await this.getProjects()
        const index = projects.findIndex(p => p.id === project.id)
        projects[index] = project
        localStorage.setItem('projects', JSON.stringify(projects))
        console.log("Project with id " + project.id + " was edited successfully")
    }

    static async getProjectById(id: number): Promise<Project> {
        const projects: Project[] = await this.getProjects()
        return projects.find(p => p.id === id)!
    }

    static async setActiveProject(id: number): Promise<void> {
        localStorage.setItem('activeProject', id.toString())
        console.log("Project with id " + id + " was set as active")
    }

    static async getActiveProject(): Promise<Project | null> {
        const id: string | null = localStorage.getItem('activeProject')
        if (id) {
            const projects: Project[] = await this.getProjects()
            return projects.find(p => p.id === parseInt(id))!
        }
        return null
    }

    static async unactiveProject(): Promise<void> {
        localStorage.removeItem('activeProject')
        console.log("Active project was removed")
    }

    static async getStories(): Promise<Story[]> {
        const stories: string | null = localStorage.getItem('stories')
        return stories ? JSON.parse(stories) : [] as Story[]
    }

    static async addStory(story: Story): Promise<void> {
        const stories: Story[] = await this.getStories()
        if (stories.find(s => s.name === story.name)) {
            alert("Story with name " + story.name + " already exists")
            return
        }
        stories.push(story)
        localStorage.setItem('stories', JSON.stringify(stories))
        console.log("Story added, id: " + story.id + ", name: " + story.name + ", desc: " + story.desc)
    }

    static async deleteStory(id: number): Promise<void> {
        let stories: Story[] = await this.getStories()
        stories = stories.filter(s => s.id !== id)
        localStorage.setItem('stories', JSON.stringify(stories))
        console.log("Story with id " + id + " was deleted successfully")
    }

    static async editStory(story: Story): Promise<void> {
        const stories: Story[] = await this.getStories()
        const index = stories.findIndex(s => s.id === story.id)
        stories[index] = story
        localStorage.setItem('stories', JSON.stringify(stories))
        console.log("Story with id " + story.id + " was edited successfully")
    }

    static async getStoryById(id: number): Promise<Story> {
        const stories: Story[] = await this.getStories()
        return stories.find(s => s.id === id)!
    }

    static async getStoriesByProjectId(project_id: number): Promise<Story[]> {
        const stories: Story[] = await this.getStories()
        return stories.filter(s => s.project_id === project_id)
    }

    static async getStoriesByProjectIdAndStatus(project_id: number, status: 'todo' | 'doing' | 'done'): Promise<Story[]> {
        const stories: Story[] = await this.getStoriesByProjectId(project_id)
        return stories.filter(s => s.status === status)
    }

    static async getTasks(): Promise<Task[]> {
        const tasks: string | null = localStorage.getItem('tasks')
        return tasks ? JSON.parse(tasks) : [] as Task[]
    }

    static async addTask(task: Task): Promise<void> {
        const tasks: Task[] = await this.getTasks()
        if (tasks.find(t => t.name === task.name)) {
            alert("Task with name " + task.name + " already exists")
            return
        }
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    static async getTaskById(taskId: number): Promise<Task> {
        const tasks: Task[] = await this.getTasks() as Task[]
        return tasks.find(t => t.id === taskId)!
    }

    static async getTasksByStoryId(storyId: number): Promise<Task[]> {
        const tasks: Task[] = await this.getTasks()
        return tasks.filter(t => t.storyId === storyId)
    }

    static async deleteTask(name: string): Promise<void> {
        let tasks: Task[] = await this.getTasks()
        tasks = tasks.filter(t => t.name !== name)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        console.log("Task with name " + name + " was deleted successfully")
    }

    static async editTask(task: Task): Promise<void> {
        const tasks: Task[] = await this.getTasks()
        const index = tasks.findIndex(t => t.id === task.id)
        tasks[index] = task
        localStorage.setItem('tasks', JSON.stringify(tasks))
        console.log("Task with name " + task.id + " was edited successfully")
    }
}

export default ProjectApi;