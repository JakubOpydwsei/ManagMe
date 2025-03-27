import { Link, useParams } from "react-router-dom";
import ProjectApi, { Task } from "../api/projectApi";
import TaskTile from "./TaskTile";
import { useEffect, useState } from "react";

function Kanban() {
    const { storyId } = useParams() as { storyId: string }

    const [tasks,setTasks] = useState<Task[] | null>(null) 

    useEffect(() => {
        const fetchTasks = async () =>{
            const fetchedTasks = await ProjectApi.getTasksByStoryId(parseInt(storyId))
            setTasks(fetchedTasks)
        }
        fetchTasks()
    },[storyId])

    if (!tasks) {
        return
    }

    return (
        <>
            <div className="p-6">
                <Link to={`/story/${storyId}/tasks`}>
                    <button type="button" className="mb-6 px-4 py-2 rounded-xl shadow transition-colors">
                        View Task List
                    </button>
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-2xl p-4 shadow-sm">
                        <p className="text-2xl mb-4 text-center font-semibold">To do</p>
                        <div className="flex flex-col gap-3">
                            {tasks
                                .filter(task => task.status === "todo")
                                .map(task => (
                                    <TaskTile key={task.id} task={task} />
                                ))}
                        </div>
                    </div>
                    <div className="rounded-2xl p-4 shadow-sm">
                        <p className="text-2xl mb-4 text-center font-semibold">Doing</p>
                        <div className="flex flex-col gap-3">
                            {tasks
                                .filter(task => task.status === "doing")
                                .map(task => (
                                    <TaskTile key={task.id} task={task} />
                                ))}
                        </div>
                    </div>
                    <div className="rounded-2xl p-4 shadow-sm">
                        <p className="text-2xl mb-4 text-center font-semibold">Done</p>
                        <div className="flex flex-col gap-3">
                            {tasks
                                .filter(task => task.status === "done")
                                .map(task => (
                                    <TaskTile key={task.id} task={task} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Kanban;
