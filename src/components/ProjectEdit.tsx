import { useParams, useNavigate } from 'react-router-dom';
import ProjectApi, { Project } from '../api/projectApi'


function ProjectEdit() {

    const { id } = useParams()
    const navigate = useNavigate()

    const project = ProjectApi.getProjectById(parseInt(id!))

    function editProject() {

        const newName = document.querySelector('#name') as HTMLInputElement
        const newDesc = document.querySelector('#desc') as HTMLTextAreaElement

        if (!newName.value || !newDesc.value) {
            alert('Please fill in all fields')
            return
            
        }

        const newProject: Project = {
            id: project!.id,
            name: newName.value,
            desc: newDesc.value
        }

        ProjectApi.editProject(newProject)
        navigate('/projects')
    }

    

    return (
        <>
            <p className='mb-4 text-3xl'>Edit project</p>
            <label htmlFor="name">Name:</label>
            <input defaultValue={project!.name} type="text" name="name" id="name" className='block' />
            <label htmlFor="desc">Description:</label>
            <textarea defaultValue={project!.desc} name="desc" id="desc" className='block'></textarea>
            <button onClick={editProject}>Edit</button>
        </>
    );
}

export default ProjectEdit;