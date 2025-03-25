import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectApi, { Story } from '../api/projectApi'


function StoryEdit() {

    const { storyId } = useParams()
    const navigate = useNavigate()

    const story = ProjectApi.getStoryById(parseInt(storyId!))

    const [name, setName] = useState(story.name)
    const [desc, setDesc] = useState(story.desc)
    const [priority, setPriority] = useState(story.priority)
    const [status, setStatus] = useState(story.status)

    function editStory(): void {



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

        ProjectApi.editStory(newStory)
        navigate('/stories')

        return;
    }

    return (<><div><p className='mb-4 text-3xl'>Add story</p>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" className='block' defaultValue={story.name} required onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="desc">Description:</label>
        <textarea name="desc" id="desc" className='block' defaultValue={story.desc} required onChange={(e)=>setDesc(e.target.value)}></textarea>
        <label htmlFor="priority">Priority:</label>
        <select name="priority" id="priority" className='block text-black bg-gray-200' defaultValue={story.priority} required onChange={(e)=>setPriority(e.target.value as "low" | "medium" | "high")}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
        </select>
        <label htmlFor="status">Status:</label>
        <select name="status" id="status" className='block text-black bg-gray-200' defaultValue={story.status} required onChange={(e)=>setStatus(e.target.value as 'todo' | 'doing' | 'done')}>
            <option value="todo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
        </select>
        <button type="button" className='mt-3' onClick={editStory}>Edit story</button></div></>);
}

export default StoryEdit;