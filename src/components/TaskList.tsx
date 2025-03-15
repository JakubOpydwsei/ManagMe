import { Link, useParams } from "react-router-dom";
import ProjectApi from "../api/projectApi";

function TaskList() {
    const { storyId } = useParams() as { storyId: string }

    function deleteTask(name: string): void {
        ProjectApi.deleteTask(name)
        window.location.reload()
    }

    return (<>
        <Link to={`/story/${storyId}/task/add`}><button>Add new Task</button></Link>
        {ProjectApi.getTasksByStoryId(parseInt(storyId)).map(task => (
            <div key={task.addDate} className='border p-4 mb-4'>
                <p className='text-2xl'>{task.name}</p>
                <p className='text-lg'>{task.desc}</p>
                <p className='text-lg'>Priority: {task.priority}</p>
                <p className='text-lg'>Working hours: {task.workingHours}</p>
                <p className='text-lg'>Status: {task.status}</p>
                <p className='text-lg'>Story id: {task.storyId}</p>
                <p className='text-lg'>Add date: {task.addDate}</p>
                {task.user && <p className='text-lg'>User: {task.user}</p>} {/* zmienić user id -> user name & surname*/}
                {task.startDate && <p className='text-lg'>Start date: {task.startDate}</p>}
                <button onClick={() => deleteTask(task.name)}>Delete</button>
                <Link to={`/story/${storyId}/task/edit/${task.id}`}><button>Edit</button></Link>
            </div>))}
    </>);
}

export default TaskList;