import ProjectApi,{Project} from '../api/projectApi';
import { Link, useNavigate } from 'react-router-dom';

type ProjectFormProps = {
    project: Project;
}

function ProjectTile({project}: ProjectFormProps) {

    const navigate = useNavigate()

    function setActiveProject(id: number) {
        ProjectApi.setActiveProject(id)
        navigate('/stories')
    }
    function deleteProject(id: number) {
        ProjectApi.deleteProject(id)
        navigate('/projects')
    }
    return (
        <li key={project.id} className="mb-4">
            <p className="text-2xl">{project.name}</p>
            <p className="mb-2">{project.desc}</p>
            <button onClick={() => deleteProject(project.id)}>Delete</button>
            <Link to={`/project/edit/${project.id}`}><button>Edit</button></Link>
            <button onClick={() => setActiveProject(project.id)}>Set as active</button>
        </li>
    );
}

export default ProjectTile;