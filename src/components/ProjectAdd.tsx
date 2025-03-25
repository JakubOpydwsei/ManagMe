import { useState } from 'react';
import ProjectApi, { Project } from '../api/projectApi'
import { useNavigate } from 'react-router-dom';

function ProjectAdd() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const validateForm = () => name.trim() !== '' && desc.trim() !== '';

    function addProject() {

        if (!validateForm()) {
            alert('Please fill in all fields');
            return;
        }

        const project: Project = {
            id: Date.now(),
            name: name,
            desc: desc
        }

        ProjectApi.addProject(project)
        navigate('/projects')
    }

    return (
        <>
            <p className='mb-4 text-3xl'>Add project</p>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" className='block' onChange={(e) => setName(e.target.value)} />
            <label htmlFor="desc">Description:</label>
            <textarea name="desc" id="desc" className='block' onChange={(e) => setDesc(e.target.value)}></textarea>
            <button className='mt-3' onClick={addProject}>Add project</button>
        </>
    );
}

export default ProjectAdd;