import { useApi } from '../contexts/ApiContext';
import { Story } from '../types/types';
import { Link } from 'react-router-dom';
import { formatDate } from "../utils/formatDate";

type StoryFormProps ={
    story: Story
}

function StoryTile({story}: StoryFormProps) {
    const { storyApi } = useApi()

    function deleteStory(id: number): void {
        storyApi.delete(id)
        location.reload(); // do wyrzucenia

    }

    return (<>
        <li key={story.id}>
            <p className="text-2xl">Name: {story.name}</p>
            <p className="mb-2">Description: {story.desc}</p>
            <p className="mb-2">Priority: {story.priority}</p>
            <p className="mb-2">Date: {formatDate(story.date)}</p>
            <p className="mb-2">Status: {story.status}</p>
            <p className="mb-2">Owner's ID: {story.owner}</p>
            <button type="button" onClick={() => deleteStory(story.id)}>Delete</button>
            <Link to={`/story/edit/${story.id}`}><button type="button">Edit</button></Link>
            <Link to={`/story/${story.id}/tasks`}> <button type="button">Tasks</button></Link>
        </li></>);
}

export default StoryTile;