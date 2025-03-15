import ProjectApi from "../api/projectApi";
import { Link, useNavigate } from 'react-router-dom';

import { Auth } from "../api/Auth";

function ProjectList() {

    const navigate = useNavigate()

    const auth = new Auth()
    const user = auth.GetActiveUser()

    const activeProject = ProjectApi.getActiveProject()

    function deleteProject(id: number): void {
        ProjectApi.deleteProject(id)
        navigate('/projects')
    }

    function setActiveProject(id: number): void {
        ProjectApi.setActiveProject(id)
        navigate('/stories')
    }

    function unactiveProject(): void {
        ProjectApi.unactiveProject()
        navigate('/projects')
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
                {ProjectApi.getProjects().map(p => (
                <li key={p.id}>
                    <p className="text-2xl">{p.name}</p>
                    <p className="mb-2">{p.desc}</p>
                    <button onClick={() => deleteProject(p.id)}>Delete</button>
                    <Link to={`/project/edit/${p.id}`}><button>Edit</button></Link>
                    <button onClick={() => setActiveProject(p.id)}>Set as active</button>
                </li>
                ))}
            </ul>
            </div>
        )}
        </>
    );
}

export default ProjectList;