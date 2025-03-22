import { Link, useParams } from "react-router-dom";
import ProjectApi from "../api/projectApi";
import { Auth } from "../api/Auth";
import { Task, CompleteTask } from "../api/projectApi";

function TaskList() {
    const { storyId } = useParams() as { storyId: string }
    const users = new Auth().getUsers()
    const tasks = ProjectApi.getTasksByStoryId(parseInt(storyId))

    function deleteTask(name: string): void {
        ProjectApi.deleteTask(name)
        window.location.reload()
    }

    function markDone(id: number): void {
        const proj = ProjectApi.getTaskById(id)
        proj.status = 'done'

        if (!('endDate' in proj)) {
            (proj as CompleteTask).endDate = new Date().toISOString();
        }

        ProjectApi.editTask(proj)
        window.location.reload()
    }

    return (<>
        <Link to={`/story/${storyId}/task/add`}><button>Add new Task</button></Link>
        <Link to={`/story/${storyId}/kanban`}><button>Kanban</button></Link>
        {tasks.map((task: Task) => (
            <div key={task.addDate} className='border-2 border-black p-4 m-4'>
                <p className='text-2xl'>{task.name}</p>
                <p className='text-lg'>{task.desc}</p>
                <p className='text-lg'>Priority: {task.priority}</p>
                <p className='text-lg'>Working hours: {task.workingHours}</p>
                <p className='text-lg'>Status: {task.status}</p>
                <p className='text-lg'>Story id: {task.storyId}</p>
                <p className='text-lg'>Add date: {task.addDate}</p>
                {"user" in task && task.user && (
                    <p className='text-lg'>Employee: {users.find(u => u.id === task.user)?.surname} {users.find(u => u.id === task.user)?.name}</p>
                )}
                {"startDate" in task && task.startDate && <p className='text-lg'>Start date: {task.startDate}</p>}
                {"endDate" in task && task.endDate && <p className='text-lg'>End date: {task.endDate}</p>}
                <button onClick={() => deleteTask(task.name)}>Delete</button>
                <Link to={`/story/${storyId}/task/edit/${task.id}`}><button>Edit</button></Link>
                {task.status !== 'done' && "user" in task && task.user && <button onClick={() => markDone(task.id)}>Mark as done</button>}
            </div>
        ))}
    </>);
}

export default TaskList;
