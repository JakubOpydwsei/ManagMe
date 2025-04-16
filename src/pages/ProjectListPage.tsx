import ProjectApi, { Project } from "../api/projectApi";
import { useNavigate } from 'react-router-dom';
import { Auth } from "../api/Auth";
import ProjectTile from "../components/ProjectTile";
import { useEffect, useState } from "react";

function ProjectListPage() {

    const navigate = useNavigate()
    const auth = new Auth()
    const user = auth.GetActiveUser()

    const [activeProject,setActiveProject] = useState <Project | null> (null)
    const [projects, setProjects] = useState <Project[] | null> (null)

    useEffect(() => {
        const fetchActiveProj = async() =>{
            const activeProj = ProjectApi.getActiveProject()
            setActiveProject(await activeProj)
        }
        fetchActiveProj()

        const fetchProjs = async() =>{
            const projects = ProjectApi.getProjects()
            setProjects(await projects)
        }
        fetchProjs()
    },[])

    function unactiveProject(): void {
        setActiveProject(null)
        navigate('/projects')
    }

    if (!projects) {
        return
    }

    return (
        <>
        <p className='mb-4 text-3xl'>Logged in as: {user.name} {user.surname}</p>
        <hr />
        {activeProject !== null ? (
            <div>
                <h1>Active project: {activeProject.name}</h1>
                <button onClick={() => unactiveProject()}>Change active project !</button>
            </div>
        ) : (
            <div>
            <p className='mb-4 text-3xl'>List of projects</p>
            <ul>
                {projects.map(p => (
                <ProjectTile key={p.id} project={p} />
                ))}
            </ul>
            </div>
        )}
        </>
    );
}

export default ProjectListPage;