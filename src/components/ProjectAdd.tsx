import { useState } from 'react';
import { useApi } from '../contexts/ApiContext';
import { useNavigate } from 'react-router-dom';
import { Project } from '../types/types';
import { useTheme } from '../contexts/ThemeContext';
import MyButton from './MyButton';
import MyInput from './MyInput';
import { useAuth } from '../contexts/AuthContext';

function ProjectAdd() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const { theme } = useTheme()
    const { projectApi } = useApi()

    const {user} = useAuth()

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

    if (user?.role === 'guest' ) {
        return (<h1>As a guest you can't use this action</h1>)
    }

    return (
        <div data-bs-theme={theme}>
            <h1 className='mb-4 text-3xl'>Add project</h1>
            <MyInput label={'Name:'} value={name} onChange={setName} />
            <MyInput label={'Description:'} value={desc} onChange={setDesc} type='textarea' />
            <MyButton text='Add project' onClick={addProject} />
        </div>
    );
}

export default ProjectAdd;