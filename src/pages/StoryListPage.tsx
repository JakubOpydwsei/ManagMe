import { useApi } from '../contexts/ApiContext';
import { Story,Project } from '../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StoryTile from '../components/StoryTile';
import { useAuth } from '../contexts/AuthContext';

function StoryListPage() {

    const navigate = useNavigate()
    const { user } = useAuth()
    const [activeProject, setActiveProject] = useState<Project | null>(null)
    const [stories, setStories] = useState<Story[] | null>(null)
    const { projectApi,storyApi } = useApi()

    useEffect(() => {
        const fetchActiveProj = async () => {

            const activeProj = await projectApi.getActiveProject();

            if (!activeProj) {
                navigate('/projects');
                return;
            }
            setActiveProject(activeProj);
        };

        fetchActiveProj();
    }, [navigate]);

    useEffect(() => {
        if (!activeProject) {
            return
        }
        const fetchStories = async () => {
            const stories = await storyApi.getByProjectId(activeProject.id);
            setStories(stories);
        };
        fetchStories();
    }, [activeProject]);

    if (!activeProject) {
        navigate('/projects')
    }

    function unactiveProject(): void {
        projectApi.unactiveProject()
        navigate('/projects')
    }



    async function filter() {
        const status = document.querySelector('#status') as HTMLSelectElement
        if (status.value === 'none') {
            return setStories(await storyApi.getByProjectId(activeProject!.id))
        }
        setStories(await storyApi.getByProjectAndStatus(activeProject!.id, status.value as 'todo' | 'doing' | 'done'))
    }

    if (!stories) {
        return
    }

    if (!activeProject) {
        return
    }

    return (
        <>
            {user && <p className='mb-4 text-3xl'>Logged in as: {user?.name} {user?.surname}</p>}
            {!user && <p className='mb-4 text-3xl'>Youre not loggined in</p>}
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