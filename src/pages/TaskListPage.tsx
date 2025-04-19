import { Link, useParams } from "react-router-dom";
import TaskTile from "../components/TaskTile";
import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { Task } from "../types/types";


function TaskListPage() {
    const { taskApi } = useApi()
    const { storyId } = useParams() as { storyId: string }
    const [tasks, setTasks] = useState<Task[] | null>(null)

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await taskApi.getByStoryId(parseInt(storyId))
            setTasks(tasks)
        }
        fetchTasks()
    }, [storyId])

    if (!tasks) {
        return
    }

    return (<>
        <Link to={`/story/${storyId}/task/add`}><button>Add new Task</button></Link>
        <Link to={`/story/${storyId}/kanban`}><button>Kanban</button></Link>
        {tasks.map((task: Task) => (
            <div className="py-2" key={task.id * 10}>
                <TaskTile key={task.id} task={task} />
            </div>

        ))}
    </>);
}

export default TaskListPage;
