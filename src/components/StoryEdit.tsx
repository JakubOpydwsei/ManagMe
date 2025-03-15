import { useParams, useNavigate } from 'react-router-dom';
import ProjectApi, { Story } from '../api/projectApi'


function StoryEdit() {

    const { storyId } = useParams()
    const navigate = useNavigate()

    const story = ProjectApi.getStoryById(parseInt(storyId!))

    function editStory(): void {

        const name = document.querySelector('#name') as HTMLInputElement
        const desc = document.querySelector('#desc') as HTMLTextAreaElement
        const priority = document.querySelector('#priority') as HTMLSelectElement
        const status = document.querySelector('#status') as HTMLSelectElement

        if (!name.value || !desc.value || !priority.value || !status.value) {
            alert('Please fill in all fields')
            return
        }

        const newStory: Story = {
            id: story.id,
            name: name.value,
            desc: desc.value,
            priority: priority.value as "low" | "medium" | "high",
            project_id: story.project_id,
            date: story.date,
            status: status.value as 'todo' | 'doing' | 'done',
            owner: story.owner
        }

        ProjectApi.editStory(newStory)
        navigate('/stories')
        
        
        return;
    }

    return (<><div><p className='mb-4 text-3xl'>Add story</p>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" className='block' defaultValue={story.name} />
        <label htmlFor="desc">Description:</label>
        <textarea name="desc" id="desc" className='block' defaultValue={story.desc}></textarea>
        <label htmlFor="priority">Priority:</label>
        <select name="priority" id="priority" className='block text-black bg-gray-200' defaultValue={story.priority}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
        </select>
        <label htmlFor="name">Status:</label>
        <select name="status" id="status" className='block text-black bg-gray-200' defaultValue={story.status}>
            <option value="todo">todo</option>
            <option value="doing">doing</option>
            <option value="done">done</option>
        </select>
        <button className='mt-3' onClick={editStory}>Edit story</button></div></>);
}

export default StoryEdit;