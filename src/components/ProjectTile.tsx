import { Link } from 'react-router-dom';
import { Project } from '../types/types';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

type Props = {
    project: Project
    onDelete: (id:number) => void
    onSetActive: (id:number) => void
}

function ProjectTile({ project, onDelete,onSetActive } : Props) {

    const {theme} = useTheme()    

    return (
        <li key={project.id} className="mb-4" data-bs-theme={theme}>
            <Card className='w-xl pb-3'>
                <Card.Body className="m-0 p-0">
                    <Card.Text className="text-3xl pb-2">{project.name}</Card.Text>
                    <Card.Text className='text-xl pb-2'>
                        {project.desc}
                    </Card.Text>
                    <div className='grid grid-cols-2 gap-3'>

                    <Button variant="danger" onClick={() => onDelete(project.id)}>
                        Delete
                    </Button>

                    <Link to={`/project/edit/${project.id}`} className="btn btn-secondary">
                        Edit
                    </Link>

                    <Button className='col-span-2' variant="primary" onClick={() => onSetActive(project.id)}>
                        Set as Active
                    </Button>
                    </div>
                </Card.Body>
            </Card>
        </li>
    );
}

export default ProjectTile;