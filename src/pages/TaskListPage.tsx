import { Link, useParams } from "react-router-dom";
import TaskTile from "../components/TaskTile";
import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { Task } from "../types/types";
import MyButton from "../components/MyButton";
import { useAuth } from "../contexts/AuthContext";

function TaskListPage() {
    const { taskApi } = useApi()
    const { storyId } = useParams() as { storyId: string }
    const [tasks, setTasks] = useState<Task[] | null>(null)
    const { user } = useAuth()

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await taskApi.getByStoryId(storyId)
            setTasks(tasks)
        };
        fetchTasks()
    }, [storyId, taskApi])

    async function deleteTask(id: number): Promise<void> {
        if (user?.role === 'guest') {
            alert("You don't have permission to use this action")
            return
        }
        await taskApi.delete(String(id))
        const updatedTasks = await taskApi.getByStoryId(storyId)
        setTasks(updatedTasks)
    }

    if (!tasks) {
        return <h1>No Task aviable</h1>
    }

    if (!tasks.length) {
        return (
            <>
                <Link to={`/story/${storyId}/task/add`}><MyButton text={"Add new Task"} /></Link>
                <Link to={`/story/${storyId}/kanban`}><MyButton text={"Kanban"} /></Link>
                <h1>No Task aviable</h1>
            </>
        )
    }

    return (
        <>
            <Link to={`/story/${storyId}/task/add`}><MyButton text={"Add new Task"} /></Link>
            <Link to={`/story/${storyId}/kanban`}><MyButton text={"Kanban"} /></Link>
            <h1>Tasks:</h1>
            <hr />
            <ul className='m-0 p-0'>
                {tasks.map((task: Task) => (
                    <TaskTile key={task.id} task={task} onDelete={() => deleteTask(task.id)} />
                ))}
            </ul>
        </>
    );
}

export default TaskListPage;