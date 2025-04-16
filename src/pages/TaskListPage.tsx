import { Link, useParams } from "react-router-dom";
import TaskTile from "../components/TaskTile";
import { useEffect, useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { Task,CompleteTask } from "../types/types";


function TaskListPage() {
    const { taskApi } = useApi()
    const { storyId } = useParams() as { storyId: string }
    const [tasks,setTasks] = useState<Task[] | null>(null)

    useEffect(() => {
        const fetchTasks = async () =>{
            const tasks = await taskApi.getByStoryId(parseInt(storyId))
            setTasks(tasks)
        }
        fetchTasks()
    },[storyId])

    function deleteTask(name: string): void {
        taskApi.delete(name)
        window.location.reload()
    }

    async function markDone(id: number): Promise<void> {
        const task = await taskApi.getById(id)
        if (!task) return;
    
        task.status = 'done'
    
        if (!('endDate' in task)) {
            (task as CompleteTask).endDate = new Date().toISOString();
        }
    
        taskApi.update(task)
        setTasks((prevTasks) => 
            prevTasks ? prevTasks.map((t) => (t.id === id ? task : t)) : []
        )           
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
