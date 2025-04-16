import { useApi } from '../contexts/ApiContext';
import { Story, Project } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function StoryList() {

    const { user } = useAuth()
    const { projectApi, storyApi } = useApi()

    const navigate = useNavigate()

    const [activeProject, setActiveProject] = useState<Project | null>(null)
    const [stories, setStories] = useState< Story[] | null>(null)

    useEffect(() => {
        const fetchActiveProject = async () => {
            const proj = await projectApi.getActiveProject()
            if (proj) {
                setActiveProject(proj)
                setStories(await storyApi.getByProjectId(proj.id))
            }
        }
        fetchActiveProject()
    }, [])



    if (!activeProject) {
        navigate('/projects')
    }

    function unactiveProject(): void {
        projectApi.unactiveProject()
        navigate('/projects')
    }

    async function deleteStory(id: number) {
        storyApi.delete(id)
        return setStories(await storyApi.getAll())
    }

    async function storyChange(status: string) {
        if (status === 'none') {
            return setStories(await storyApi.getByProjectId(activeProject!.id))
        }
        setStories(await storyApi.getByProjectAndStatus(activeProject!.id, status as 'todo' | 'doing' | 'done'))
    }

    if (stories === null) {
        return <p>Loading...</p>
    }

    return (
        <>
            <p className='mb-4 text-3xl'>Logged in as: {user!.name} {user!.surname}</p>
            <hr />
            {activeProject !== null ? (
                <div>
                    <p className='mb-4 text-3xl'>Active project: {activeProject.name}</p>
                    <button onClick={() => unactiveProject()}>Change active project !</button>
                    <hr />
                    <p className='mb-4 text-3xl'>Stories</p>
                    <label htmlFor="name">Status:</label>
                    <select name="status" id="status" className='block text-black bg-gray-200' onChange={e => storyChange(e.target.value)}>
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
                                <button><Link to={`/editStory/${s.id}`}>✏️ Edit</Link></button>
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