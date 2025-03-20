import { Link, useParams } from "react-router-dom";
import ProjectApi from "../api/projectApi";
import { Auth } from "../api/Auth";

function TaskList() {
    const { storyId } = useParams() as { storyId: string }
    const users = new Auth().getUsers()
    const user = users.find(u => u.id === ProjectApi.getTasksByStoryId(parseInt(storyId))[0].user)

    function deleteTask(name: string): void {
        ProjectApi.deleteTask(name)
        window.location.reload()
    }

    function markDone(id: number): void {
        const proj = ProjectApi.getTaskById(id)
        proj.status = 'done'
        proj.endDate = new Date().toISOString()
        ProjectApi.editTask(proj)
        window.location.reload()
    }

    return (<>
        <Link to={`/story/${storyId}/task/add`}><button>Add new Task</button></Link>
        <Link to={`/story/${storyId}/kanban`}><button>Kanban</button></Link>
        {ProjectApi.getTasksByStoryId(parseInt(storyId)).map(task => (
            <div key={task.addDate} className='border-2 border-black p-4 m-4'>
                <p className='text-2xl'>{task.name}</p>
                <p className='text-lg'>{task.desc}</p>
                <p className='text-lg'>Priority: {task.priority}</p>
                <p className='text-lg'>Working hours: {task.workingHours}</p>
                <p className='text-lg'>Status: {task.status}</p>
                <p className='text-lg'>Story id: {task.storyId}</p>
                <p className='text-lg'>Add date: {task.addDate}</p>
                {task.user && <p className='text-lg'>Employee: {user?.surname} {user?.name}</p>}
                {task.startDate && <p className='text-lg'>Start date: {task.startDate}</p>}
                {task.endDate && <p className='text-lg'>End date: {task.endDate}</p>}
                <button onClick={() => deleteTask(task.name)}>Delete</button>
                <Link to={`/story/${storyId}/task/edit/${task.id}`}><button>Edit</button></Link>
                {task.status !== 'done' && task.user && <button onClick={() => markDone(task.id)}>Mark as done</button>}
            </div>))}

    </>);
}

export default TaskList;