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

            const activeProj = await projectApi.getActiveProject();

            if (!activeProj) {
                navigate('/projects');
                return;
            }
            setActiveProject(activeProj);
        };

        fetchActiveProj();
    }, [navigate, projectApi]);

    useEffect(() => {
        if (!activeProject) {
            return
        }
        const fetchStories = async () => {
            const stories = await storyApi.getByProjectId(activeProject.id);
            setStories(stories);
        };
        fetchStories();
    }, [activeProject, storyApi]);


    function unactiveProject(): void {
        projectApi.unactiveProject()
        navigate('/projects')
    }

    function deleteStory(id: number): void {
        if(user?.role === 'guest'){
            alert("You dont have permision to use this actions")
            return
        }
        storyApi.delete(id)
        const stories = storyApi.getByProjectId(activeProject!.id)
        setStories(stories)
    }



    function filter() {
        const status = document.querySelector('#status') as HTMLSelectElement
        if (status.value === 'none') {
            return setStories(storyApi.getByProjectId(activeProject!.id))
        }
        setStories(storyApi.getByProjectAndStatus(activeProject!.id, status.value as 'todo' | 'doing' | 'done'))
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
                    <MyButton text='Change active project !' onClick={() => unactiveProject()} />
                    <Link to={`/story/add`}><MyButton text='Add Story' /></Link>
                    <hr />
                    <p className='mb-4 text-3xl'>Stories</p>

                    <Form.Group className="mb-4 m-auto w-2/5">
                        <Form.Label htmlFor="status" className="">Filter by status:</Form.Label>
                        <Form.Select
                            id="status"
                            name="status"
                            onChange={filter}
                            className=""
                        >
                            <option value="none">none</option>
                            <option value="todo">todo</option>
                            <option value="doing">doing</option>
                            <option value="done">done</option>
                        </Form.Select>
                    </Form.Group>

                    {stories.map(s => (
                        <StoryTile key={s.id} story={s} onDelete={() => deleteStory(s.id)} />

                    ))}

                </div>
            ) : (
                <h1>You need to have an active project !</h1>
            )}
        </>
    );
}

export default StoryListPage;