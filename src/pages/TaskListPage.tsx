import { Link, useParams } from "react-router-dom";
import ProjectApi, {CompleteTask} from "../api/projectApi";
import { Task } from "../api/projectApi";
import TaskTile from "../components/TaskTile";
import { useEffect, useState } from "react";

function TaskListPage() {

    const { storyId } = useParams() as { storyId: string }
    const [tasks,setTasks] = useState<Task[] | null>(null)

    useEffect(() => {
        const fetchTasks = async () =>{
            const tasks = await ProjectApi.getTasksByStoryId(parseInt(storyId))
            setTasks(tasks)
        }
        fetchTasks()
    },[storyId])

    function deleteTask(name: string): void {
        ProjectApi.deleteTask(name)
        window.location.reload()
    }

    async function markDone(id: number): Promise<void> {
        const proj = await ProjectApi.getTaskById(id)
        proj.status = 'done'

        if (!('endDate' in proj)) {
            (proj as CompleteTask).endDate = new Date().toISOString();
        }

        ProjectApi.editTask(proj)
        // window.location.reload()
        // chatGPT
        setTasks((prevTasks) => 
            prevTasks ? prevTasks.map((task) => (task.id === id ? proj : task)) : null
        );
    }

    if (!tasks) {
        return
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
