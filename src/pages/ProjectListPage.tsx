import ProjectApi from "../api/projectApi";
import { useNavigate } from 'react-router-dom';
import { Auth } from "../api/Auth";
import ProjectTile from "../components/ProjectTile";

function ProjectListPage() {

    const navigate = useNavigate()
    const auth = new Auth()
    const user = auth.GetActiveUser()
    const activeProject = ProjectApi.getActiveProject()

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
                <ProjectTile key={p.id} project={p} />
                ))}
            </ul>
            </div>
        )}
        </>
    );
}

export default ProjectListPage;