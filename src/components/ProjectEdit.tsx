import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectApi, { Project } from '../api/projectApi'

function ProjectEdit() {
    const { projectId } = useParams()

    const [project, setProject] = useState<Project | null>(null);
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProject = async () => {

            if (!projectId) {
                return
            }

            const fetchedProject = await ProjectApi.getProjectById(parseInt(projectId))

            if (!fetchProject) {
                navigate('/projects');
                return;
            }

            setProject(fetchedProject);
            setName(fetchedProject.name);
            setDesc(fetchedProject.desc);

        }

        fetchProject()

    }, [navigate, projectId])


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
            <input defaultValue={name} type="text" name="name" id="name" className='block' required onChange={(e) => setName(e.target.value)} />
            <label htmlFor="desc">Description:</label>
            <textarea defaultValue={desc} name="desc" id="desc" className='block' required onChange={(e) => setDesc(e.target.value)}></textarea>
            <button type="button" onClick={editProject}>Edit</button>
        </>
    );
}

export default ProjectEdit;