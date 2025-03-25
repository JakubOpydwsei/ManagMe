import { Link, useParams } from "react-router-dom";
import ProjectApi, {CompleteTask} from "../api/projectApi";
import { Task } from "../api/projectApi";
import TaskTile from "../components/TaskTile";

function TaskListPage() {

    const { storyId } = useParams() as { storyId: string }
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
            <div className="py-5" key={task.id * 10}>
                <TaskTile key={task.id} task={task} />
                <button onClick={() => deleteTask(task.name)}>Delete</button>
                <Link to={`/story/${task.storyId}/task/edit/${task.id}`}><button>Edit</button></Link>
                {task.status !== 'done' && "user" in task && task.user && <button onClick={() => markDone(task.id)}>Mark as done</button>}
            </div>

        ))}
    </>);
}

export default TaskListPage;
