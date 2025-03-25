import ProjectApi from '../api/projectApi'
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from "../api/Auth";
import { useState } from 'react';
import StoryTile from '../components/StoryTile';
function StoryListPage() {

    const navigate = useNavigate()
    const auth = new Auth()
    const user = auth.GetActiveUser()
    const activeProject = ProjectApi.getActiveProject()

    const [stories, setStories] = useState(ProjectApi.getStoriesByProjectId(activeProject!.id))

    if (!activeProject) {
        navigate('/projects')
    }
    
    function unactiveProject(): void {
        ProjectApi.unactiveProject()
        navigate('/projects')
    }

    

    function filter() {
        const status = document.querySelector('#status') as HTMLSelectElement
        if (status.value === 'none') {
            return setStories(ProjectApi.getStoriesByProjectId(activeProject!.id))
        }
        setStories(ProjectApi.getStoriesByProjectIdAndStatus(activeProject!.id ,status.value as 'todo' | 'doing' | 'done'))
    }

    return (
        <>
            <p className='mb-4 text-3xl'>Logged in as: {user.name} {user.surname}</p>
            <hr />
            {activeProject !== null ? (
                <div>
                    <p className='mb-4 text-3xl'>Active project: {activeProject.name}</p>
                    <button onClick={() => unactiveProject()}>Change active project !</button>
                    <Link to={`/story/add`}><button>Add Story</button></Link>
                    <hr />
                    <p className='mb-4 text-3xl'>Stories</p>
                    <label htmlFor="name">Filter by status: </label>
                    <select name="status" id="status" className='text-white border-1 border-white mb-4' onChange={filter}>
                        <option value="none" className='text-black'>none</option>
                        <option value="todo" className='text-black'>todo</option>
                        <option value="doing" className='text-black'>doing</option>
                        <option value="done" className='text-black'>done</option>
                    </select>
                    <ul>
                        {stories.map(s => (
                            <StoryTile key={s.id} story={s} />
                            
                        ))}
                    </ul>
                </div>
            ) : (
                <h1>You need to have an active project !</h1>
            )}
        </>
    );
}

export default StoryListPage;