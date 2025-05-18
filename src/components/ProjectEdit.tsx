import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../contexts/ApiContext';
import { Project } from '../types/types';
import { useTheme } from '../contexts/ThemeContext';
import MyButton from './MyButton';
import MyInput from './MyInput';
import { useAuth } from '../contexts/AuthContext';

function ProjectEdit() {

    const { projectId } = useParams()

    const [project, setProject] = useState<Project | null>(null);
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const {theme} = useTheme()
    const { projectApi } = useApi()
    const {user} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProject = async () => {

            if (!projectId) {
                return
            }

            const fetchedProject = await projectApi.getById(projectId)

            if (!fetchProject) {
                navigate('/projects')
            }

            if (!fetchedProject){
                return
            }

            setProject(fetchedProject);
            setName(fetchedProject.name);
            setDesc(fetchedProject.desc);

        }

        fetchProject()

    }, [navigate, projectApi, projectId])


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

        projectApi.update(newProject)
        navigate('/projects')
    }

    if (user?.role === 'guest' ) {
        return (<h1>As a guest you can't use this action</h1>)
    }

    return (
        <div data-bs-theme={theme}>
            <p className='mb-4 text-3xl'>Edit project</p>
            <MyInput label={'Name:'} value={name} onChange={setName} />
            <MyInput label={'Description:'} value={desc} onChange={setDesc} type='textarea' /><MyButton text='Edit' onClick={editProject}/>
        </div>
    );
}

export default ProjectEdit;