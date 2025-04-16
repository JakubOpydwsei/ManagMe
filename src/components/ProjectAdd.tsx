import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types/types';

function ProjectAdd() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const { projectApi } = useApi()

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

        projectApi.add(project)
        navigate('/projects')
    }

    return (
        <>
            <p className='mb-4 text-3xl'>Add project</p>
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" id="name" className='block' required onChange={(e) => setName(e.target.value)} />
            <label htmlFor="desc">Description:</label>
            <textarea name="desc" id="desc" className='block' required onChange={(e) => setDesc(e.target.value)}></textarea>
            <button type="button" className='mt-3' onClick={addProject}>Add project</button>
        </>
    );
}

export default ProjectAdd;