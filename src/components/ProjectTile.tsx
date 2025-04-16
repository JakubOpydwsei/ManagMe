import { useApi } from '../contexts/ApiContext';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from '../types/types';

type ProjectFormProps = {
    project: Project;
}

function ProjectTile({ project }: ProjectFormProps) {

    const navigate = useNavigate()
    const { projectApi } = useApi()

    function setActiveProject(id: number) {
        projectApi.setActiveProject(id)
        navigate('/stories')
    }

    function deleteProject(id: number) {
        projectApi.delete(id)
        navigate('/projects')
    }

    return (
        <li key={project.id} className="mb-4">
            <p className="text-2xl">{project.name}</p>
            <p className="mb-2">{project.desc}</p>
            <button type="button" onClick={() => deleteProject(project.id)}>Delete</button>
            <Link to={`/project/edit/${project.id}`}><button type="button">Edit</button></Link>
            <button type="button" onClick={() => setActiveProject(project.id)}>Set as active</button>
        </li>
    );
}

export default ProjectTile;