import { Link, useParams } from "react-router-dom";
import { useApi } from "../contexts/ApiContext";
import { Task } from "../types/types";
import TaskTile from "./TaskTile";
import { useEffect, useState } from "react";
import MyButton from "./MyButton";

function Kanban() {

    const { storyId } = useParams() as { storyId: string }
    const { taskApi } = useApi()
    const [tasks, setTasks] = useState<Task[] | null>(null)

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await taskApi.getByStoryId(storyId)
            setTasks(fetchedTasks)
        }
        fetchTasks()
    }, [storyId, taskApi])

    if (!tasks) {
        return
    }

    return (
        <>
            <div className="py-4">
                <Link to={`/story/${storyId}/tasks`}>
                    <MyButton text={"View Task List"} />
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="rounded-2xl py-4">
                        <p className="text-2xl mb-4 text-center font-semibold">To do</p>
                        <div className="flex flex-col gap-3">
                            {tasks
                                .filter(task => task.status === "todo")
                                .map(task => (
                                    <TaskTile key={task.id} task={task} />
                                ))}
                        </div>
                    </div>
                    <div className="rounded-2xl py-4">
                        <p className="text-2xl mb-4 text-center font-semibold">Doing</p>
                        <div className="flex flex-col gap-3">
                            {tasks
                                .filter(task => task.status === "doing")
                                .map(task => (
                                    <TaskTile key={task.id} task={task} />
                                ))}
                        </div>
                    </div>
                    <div className="rounded-2xl py-4">
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
