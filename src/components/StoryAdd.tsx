import ProjectApi from '../api/projectApi'
import { useNavigate } from 'react-router-dom';
import { Story } from '../api/projectApi';
import { Auth } from "../api/Auth";

function StoryAdd() {

    const navigate = useNavigate()

    const auth = new Auth()
    const user = auth.GetActiveUser()
    const activeProject = ProjectApi.getActiveProject()

    function addStory() {
        const name = document.querySelector('#name') as HTMLInputElement
        const desc = document.querySelector('#desc') as HTMLTextAreaElement
        const priority = document.querySelector('#priority') as HTMLSelectElement
        const status = document.querySelector('#status') as HTMLSelectElement

        if (!name.value || !desc.value || !priority.value || !status.value) {
            alert('Please fill in all fields')
            return
        }


        const story: Story = {
            id: Date.now(),
            name: name.value,
            desc: desc.value,
            priority: priority.value as "low" | "medium" | "high",
            project_id: activeProject!.id,
            date: new Date().toISOString(),
            status: status.value as 'todo' | 'doing' | 'done',
            owner: user.id
        }

        ProjectApi.addStory(story)
        navigate('/stories')
    }

    return (
        <>
            {activeProject ? (
                <div>
                    <p className='mb-4 text-3xl'>Add story</p>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" className='block' />
                    <label htmlFor="desc">Description:</label>
                    <textarea name="desc" id="desc" className='block'></textarea>
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority" className='block text-black bg-gray-200'>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>
                    <label htmlFor="name">Status:</label>
                    <select name="status" id="status" className='block text-black bg-gray-200'>
                        <option value="todo">todo</option>
                        <option value="doing">doing</option>
                        <option value="done">done</option>
                    </select>
                    <button className='mt-3' onClick={addStory}>Add story</button>
                </div>
            ) : (<h1>You have no active project !</h1>)}
        </>
    );
}

export default StoryAdd;