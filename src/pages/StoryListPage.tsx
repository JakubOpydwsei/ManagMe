import { useApi } from '../contexts/ApiContext';
import { Story, Project } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StoryTile from '../components/StoryTile';
import { useAuth } from '../contexts/AuthContext';
import MyButton from '../components/MyButton';
import { Form } from 'react-bootstrap';

function StoryListPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [activeProject, setActiveProject] = useState<Project | null>(null)
    const [stories, setStories] = useState<Story[] | null>(null)
    const { projectApi, storyApi } = useApi()

    useEffect(() => {
        const fetchActiveProj = async () => {
            const activeProj = await projectApi.getActiveProject()
            if (!activeProj) {
                navigate('/projects')
                return;
            }
            setActiveProject(activeProj)
        };
        fetchActiveProj()
    }, [navigate, projectApi])

    useEffect(() => {
        if (!activeProject) return

        const fetchStories = async () => {
            const stories = await storyApi.getByProjectId(String(activeProject.id))
            setStories(stories)
        };
        fetchStories();
    }, [activeProject, storyApi])

    async function unactiveProject(): Promise<void> {
        projectApi.unactiveProject()
        navigate('/projects')
    }

    async function deleteStory(id: number): Promise<void> {
        if (user?.role === 'guest') {
            alert("You don't have permission to use this action")
            return
        }
        await storyApi.delete(String(id));
        const updatedStories = await storyApi.getByProjectId(String(activeProject!.id))
        setStories(updatedStories)
    }

    async function filter(): Promise<void> {
        const status = document.querySelector('#status') as HTMLSelectElement
        if (status.value === 'none') {
            const allStories = await storyApi.getByProjectId(String(activeProject!.id));
            setStories(allStories);
        } else {
            const filteredStories = await storyApi.getByProjectAndStatus(
                String(activeProject!.id),
                status.value as 'todo' | 'doing' | 'done'
            );
            setStories(filteredStories);
        }
    }

    if (!stories) return null
    if (!activeProject) return null

    return (
        <>
            {user ? (
                <p className='mb-4 text-3xl'>Logged in as: {user.name} {user.surname}</p>
            ) : (
                <p className='mb-4 text-3xl'>You're not logged in</p>
            )}
            <hr />
            <div>
                <h1 className='mb-4 text-3xl'>Active project: {activeProject.name}</h1>
                <MyButton text='Change active project !' onClick={() => unactiveProject()} />
                <Link to={`/story/add`}><MyButton text='Add Story' /></Link>
                <hr />
                <p className='mb-4 text-3xl'>Stories</p>

                <Form.Group className="mb-4 m-auto w-2xl md:w-xl lg:max-w-full">
                    <Form.Label htmlFor="status">Filter by status:</Form.Label>
                    <Form.Select
                        id="status"
                        name="status"
                        onChange={filter}
                        className="text-center"
                    >
                        <option value="none">none</option>
                        <option value="todo">todo</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                    </Form.Select>
                </Form.Group>

                {stories.map(s => (
                    <ul key={s.id} className='m-0 p-0'>
                        <StoryTile story={s} onDelete={() => deleteStory(s.id)} />
                    </ul>
                ))}
            </div>
        </>
    );
}

export default StoryListPage;
