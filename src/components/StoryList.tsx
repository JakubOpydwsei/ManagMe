import ProjectApi from '../api/projectApi'
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from "../api/Auth";
import { useState } from 'react';

function StoryList() {

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

    function deleteStory(id: number): void {
        ProjectApi.deleteStory(id)
        return setStories(ProjectApi.getStoriesByProjectId(activeProject!.id))
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
                    <label htmlFor="name">Status:</label>
                    <select name="status" id="status" className='block text-black bg-gray-200' onChange={filter}>
                        <option value="none">none</option>
                        <option value="todo">todo</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                    </select>
                    <ul>
                        {stories.map(s => (
                            <li key={s.id}>
                                <p className="text-2xl">Name: {s.name}</p>
                                <p className="mb-2">Description: {s.desc}</p>
                                <p className="mb-2">Priority: {s.priority}</p>
                                <p className="mb-2">Date: {s.date}</p>
                                <p className="mb-2">Status: {s.status}</p>
                                <p className="mb-2">Owner's ID: {s.owner}</p>
                                <button onClick={() => deleteStory(s.id)}>Delete</button>
                                <Link to={`/story/edit/${s.id}`}><button>Edit</button></Link>
                               <Link to={`/story/${s.id}/tasks`}> <button>Tasks</button></Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h1>You need to have an active project !</h1>
            )}
        </>
    );
}

export default StoryList;