import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiContext';
import { Story } from '../types/types';
import MyInput from './MyInput';
import { Form } from 'react-bootstrap';
import MyButton from './MyButton';

function StoryEdit() {

    const { storyId } = useParams()
    const { storyApi } = useApi()
    const navigate = useNavigate()

    const [story, setStory] = useState<Story | null>(null)
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [priority, setPriority] = useState('')
    const [status, setStatus] = useState('')

    useEffect(() => {
        const fetchProject = async () => {
            if (!storyId) {
                return
            }
            const story = await storyApi.getById(parseInt(storyId))
            if (story) {
                setStory(story)
            }

            if (!story) {
                return
            }

            setName(story.name)
            setDesc(story.desc)
            setPriority(story.priority)
            setStatus(story.status)
        }
        fetchProject()
    }, [storyId])

    function editStory(): void {

        if (!story) {
            return
        }

        const validateForm = () => name.trim() !== '' && desc.trim() !== '' && priority.trim() !== '' && status.trim() !== '';

        if (!validateForm) {
            alert('Please fill in all fields')
            return
        }

        const newStory: Story = {
            id: story.id,
            name: name,
            desc: desc,
            priority: priority as "low" | "medium" | "high",
            project_id: story.project_id,
            date: story.date,
            status: status as 'todo' | 'doing' | 'done',
            owner: story.owner
        }

        storyApi.update(newStory)
        navigate('/stories')

        return;
    }

    if (!story) {
        return
    }

    return (<>
        <div>
            <p className='mb-4 text-3xl'>Edit story</p>

            <MyInput label={'Name:'} value={name} onChange={setName} />
            <MyInput label={'Description:'} value={desc} onChange={setDesc} type='textarea' />

            <Form.Group className="mb-4 m-auto">
                <Form.Label htmlFor="priority" className="">Priority:</Form.Label>
                <Form.Select
                    id="priority"
                    name="priority"
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                    className="text-center"
                    value={priority}
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
                    value={status}
                >
                    <option value="todo">todo</option>
                    <option value="doing">doing</option>
                    <option value="done">done</option>
                </Form.Select>
            </Form.Group>

            <MyButton text={'Edit story'} onClick={editStory}/>

        </div>
    </>);
}

export default StoryEdit;