import { Story } from '../types/types';
import { Link } from 'react-router-dom';
import { formatDate } from "../utils/formatDate";
import { Button, Card } from 'react-bootstrap';

type StoryFormProps = {
    story: Story
    onDelete: () => void
}

function StoryTile({ story, onDelete }: StoryFormProps) {

    return (<>
            <li key={story.id} className="w-full mb-2 flex justify-center items-center">
            <Card className='w-full md:max-w-xl lg:max-w-2xl pb-3 mb-2 md:mb-4'>
                <Card.Body className="m-0 p-0">
                    <Card.Text className="text-3xl pb-2">Name: {story.name}</Card.Text>
                    <Card.Text className='text-xl pb-2'>
                        Description: {story.desc}
                    </Card.Text>
                    <Card.Text className='text-xl pb-2'>
                        Priority: {story.priority}
                    </Card.Text>
                    <Card.Text className='text-xl pb-2'>
                        Date: {formatDate(story.date)}
                    </Card.Text>
                    <Card.Text className='text-xl pb-2'>
                        Status: {story.status}
                    </Card.Text>
                    <Card.Text className='text-xl pb-2'>
                        Owner ID: {story.owner}
                    </Card.Text>
                    <div className='grid grid-cols-2 gap-2 md:gap-3 lg:gap-4'>

                        <Button variant="danger" onClick={onDelete}>
                            Delete
                        </Button>

                        <Link to={`/story/edit/${story.id}`} className="btn btn-secondary">
                            Edit
                        </Link>

                        <Link to={`/story/${story.id}/tasks`} className="btn btn-primary col-span-2">
                            Tasks
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </li>
        </>);
}

export default StoryTile;