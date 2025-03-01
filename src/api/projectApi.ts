export type Project = {
    id: number
    name: string
    desc: string
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
}

export default ProjectApi;