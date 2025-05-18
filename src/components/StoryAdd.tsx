import { useEffect, useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useNavigate } from 'react-router-dom';
import { Story } from '../types/types';
import { useAuth } from '../contexts/AuthContext';
import { Form } from 'react-bootstrap';
import MyButton from './MyButton';
import MyInput from './MyInput';

function StoryAdd() {

    const navigate = useNavigate()
    const { storyApi, projectApi } = useApi()
    const { user } = useAuth()

    const [activeProject, setActiveProject] = useState<{ id: number } | null>(null)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('low')
    const [status, setStatus] = useState<'todo' | 'doing' | 'done'>('todo')

    useEffect(() => {
        const fetchActiveProject = async () => {
            const activeProject = await projectApi.getActiveProject()
            setActiveProject(activeProject)
        }
        fetchActiveProject()
    }, [projectApi])

    function addStory() {
        const validateForm = () => name.trim() !== '' && desc.trim() !== '' && priority.trim() !== '' && status.trim() !== ''

        if (!validateForm()) {
            alert('Please fill in all fields')
            return
        }

        const story: Story = {
            id: Date.now(),
            name: name,
            desc: desc,
            priority: priority as "low" | "medium" | "high",
            project_id: activeProject!.id,
            date: new Date().toISOString(),
            status: status as 'todo' | 'doing' | 'done',
            owner: user!.id
        }

        storyApi.add(story)
        navigate('/stories')
    }

    if (!activeProject) {
        return <h1>You have no active project!</h1>
    }

    if (user?.role === 'guest' ) {
        return (<h1>As a guest you can't use this action</h1>)
    }

    return (
        <>
            <div>
                <p className='mb-4 text-3xl'>Add story</p>
                <MyInput label={'Name:'} value={name} onChange={setName} />
                <MyInput label={'Description:'} value={desc} onChange={setDesc} type='textarea' />

                <Form.Group className="mb-4 m-auto">
                    <Form.Label htmlFor="priority" className="">Priority:</Form.Label>
                    <Form.Select
                        id="priority"
                        name="priority"
                        onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                        className="text-center"
                    >
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4 m-auto">
                    <Form.Label htmlFor="status" className="">Status:</Form.Label>
                    <Form.Select
                        id="status"
                        name="status"
                        onChange={(e) => setStatus(e.target.value as 'todo' | 'doing' | 'done')}
                        className="text-center"
                    >
                        <option value="todo">todo</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                    </Form.Select>
                </Form.Group>

                <MyButton text={'Add story'} onClick={addStory} />
            </div>
        </>
    );
}

export default StoryAdd;