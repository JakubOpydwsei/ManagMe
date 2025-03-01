import ProjectApi from "../api/projectApi";
import { Link, useNavigate } from 'react-router-dom';

function ProjectList() {

    const navigate = useNavigate()

    function deleteProject(id: number): void {
        ProjectApi.deleteProject(id)
        navigate('/')
    }

    return (
        <>
            <p className='mb-4 text-3xl'>List of project</p>
            <ul>
                {ProjectApi.getProjects().map(p => (
                    <li key={p.id}>
                        <p className="text-2xl">{p.name}</p>
                        <p className="mb-2">{p.desc}</p>
                        <button onClick={() => deleteProject(p.id)}>Delete</button>
                        <button><Link to={`/edit/${p.id}`}>✏️ Edytuj</Link></button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ProjectList;