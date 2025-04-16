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
  