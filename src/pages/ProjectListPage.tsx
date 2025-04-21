import { useNavigate } from 'react-router-dom';
import ProjectTile from "../components/ProjectTile";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from '../contexts/ApiContext';
import { Project } from '../types/types';
import MyButton from '../components/MyButton';

function ProjectListPage() {

    const navigate = useNavigate()

    const { projectApi } = useApi()
    const { user } = useAuth()
    const [activeProject, setActiveProject] = useState<Project | null>(null)
    const [projects, setProjects] = useState<Project[] | null>(null)

    useEffect(() => {
        const fetchActiveProj = async () => {
            const activeProj = projectApi.getActiveProject()
            setActiveProject(await activeProj)
        }
        fetchActiveProj()

        const fetchProjs = async () => {
            const projects = projectApi.getAll()
            setProjects(await projects)
        }
        fetchProjs()
    }, [projectApi])

    function unactiveProject(): void {
        projectApi.unactiveProject()
        setActiveProject(null)
        navigate('/projects')
    }

    async function deleteProject(id: number) {
        if(user?.role === 'guest'){
            alert("You dont have permision to use this actions")
            return
        }
        await projectApi.delete(id)
        const projects = projectApi.getAll()
        setProjects(projects)
    }

    function setNewActiveProject(id: number) {
        projectApi.setActiveProject(id)
        navigate('/stories')
    }

    if (!projects) {
        return
    }

    return (
        <>
            {user && <p className='mb-4 text-3xl'>Logged in as: {user?.name} {user?.surname}</p>}
            {!user && <p className='mb-4 text-3xl'>Youre not loggined in</p>}
            <hr />
            {activeProject !== null ? (
                <div>
                    <h1>Active project: {activeProject.name}</h1>
                    <MyButton text='Change active project !' onClick={() => unactiveProject()} />
                </div>
            ) : (
                <div>
                    <p className='mb-4 text-3xl'>List of projects</p>
                    <ul>
                        {projects.map(p => (
                            <ProjectTile key={p.id} project={p} onDelete={() => deleteProject(p.id)} onSetActive={() => setNewActiveProject(p.id)} />
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProjectListPage;