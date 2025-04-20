import { Link, useParams } from "react-router-dom";
import TaskTile from "../components/TaskTile";
import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { Task } from "../types/types";
import MyButton from "../components/MyButton";


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

    function deleteTask(id: number): void {
        taskApi.delete(id)
        const tasks = taskApi.getByStoryId(parseInt(storyId))
        setTasks(tasks)
    }

    if (!tasks) {
        return
    }

    return (<>
        <Link to={`/story/${storyId}/task/add`}><MyButton text={"Add new Task"}/></Link>
        <Link to={`/story/${storyId}/kanban`}><MyButton text={"Kanban"}/></Link>
        {tasks.map((task: Task) => (
            <div className="py-2" key={task.id * 10}>
                <TaskTile key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
            </div>

        ))}
    </>);
}

export default TaskListPage;
