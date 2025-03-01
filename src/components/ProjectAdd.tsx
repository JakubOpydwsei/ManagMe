import ProjectApi, { Project } from '../api/projectApi'
import { useNavigate } from 'react-router-dom';

function ProjectAdd() {
    const navigate = useNavigate()

    function addProject() {
        const name = document.querySelector('#name') as HTMLInputElement
        const desc = document.querySelector('#desc') as HTMLTextAreaElement

        const project: Project = {
            id: Date.now(),
            name: name.value,
            desc: desc.value
        }

        ProjectApi.addProject(project)
        navigate('/')
    }

    return (
        <>
            <p className='mb-4 text-3xl'>Add project</p>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" className='block' />
            <label htmlFor="desc">Description:</label>
            <textarea name="desc" id="desc" className='block'></textarea>
            <button className='mt-3' onClick={addProject}>Add project</button>
        </>
    );
}

export default ProjectAdd;