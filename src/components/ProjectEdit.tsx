import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectApi, { Project } from '../api/projectApi'

function ProjectEdit() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')

    const { projectId } = useParams()
    const navigate = useNavigate()

    const project = ProjectApi.getProjectById(parseInt(projectId!))

    function editProject() {

        const validateForm = () => name.trim() !== '' && desc.trim() !== '';

        if (!validateForm()) {
            alert('Please fill in all fields');
            return;
        }

        const newProject: Project = {
            id: project!.id,
            name: name,
            desc: desc
        }

        ProjectApi.editProject(newProject)
        navigate('/projects')
    }

    return (
        <>
            <p className='mb-4 text-3xl'>Edit project</p>
            <label htmlFor="name">Name:</label>
            <input defaultValue={project!.name} type="text" name="name" id="name" className='block' onChange={(e) => setName(e.target.value)} />
            <label htmlFor="desc">Description:</label>
            <textarea defaultValue={project!.desc} name="desc" id="desc" className='block' onChange={(e) => setDesc(e.target.value)}></textarea>
            <button onClick={editProject}>Edit</button>
        </>
    );
}

export default ProjectEdit;