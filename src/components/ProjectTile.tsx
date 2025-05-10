import { Link } from 'react-router-dom';
import { Project } from '../types/types';
import { Button, Card } from 'react-bootstrap';

type Props = {
    project: Project
    onDelete: (id:number) => void
    onSetActive: (id:number) => void
}

function ProjectTile({ project, onDelete,onSetActive } : Props) {
  

    return (
        <li key={project.id} className="w-full mb-2 flex justify-center items-center">
            <Card className='w-full md:max-w-xl lg:max-w-2xl pb-3 md:mb-4'>
                <Card.Body className="m-0 p-0">
                    <Card.Text className="text-3xl pb-2">{project.name}</Card.Text>
                    <Card.Text className='text-xl pb-2'>
                        {project.desc}
                    </Card.Text>
                    <div className='grid grid-cols-2 gap-2 md:gap-3 lg:gap-4'>

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