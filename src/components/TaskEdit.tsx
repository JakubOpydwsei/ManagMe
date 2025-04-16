import { useState, useEffect } from "react"
import { useApi } from "../contexts/ApiContext";
import { Task } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Auth } from "../api/Auth";
import { useParams } from "react-router-dom";

function TaskEdit() {
    const { storyId, taskId } = useParams() as { storyId: string, taskId: string };
    const Id = parseInt(storyId);
    const navigate = useNavigate();
    const [task, setTask] = useState<Task | null>(null);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [workingHours, setWorkingHours] = useState(0);
    const [userId, setUserId] = useState<string>('');

    let users = new Auth().getUsers();
    users = users.filter(u => u.role !== "admin");
    const { taskApi } = useApi();


    useEffect(() => {
        async function fetchTask() {
            const fetchedTask = await taskApi.getById(parseInt(taskId))
            if (!fetchedTask) {
                return
            }
            setTask(fetchedTask)
            setName(fetchedTask.name)
            setDesc(fetchedTask.desc)
            setPriority(fetchedTask.priority)
            setWorkingHours(fetchedTask.workingHours)
            if ('user' in fetchedTask && fetchedTask.user) {
                console.log(fetchedTask)
                setUserId(fetchedTask.user.toString())
            }
        }

        fetchTask()

    }, [taskId]);




    function editTask() {
        if (!task) {
            return
        }
        if (!name || !desc || !priority || !workingHours) {
            alert("Please fill required fields");
            return;
        }

        console.log(userId)

        let updatedTask: Task;
        if (userId) {
            if ("startDate" in task) {
                updatedTask = {
                    id: task.id,
                    name,
                    desc,
                    priority,
                    workingHours,
                    status: "doing" as 'doing',
                    storyId: Id,
                    addDate: task.addDate,
                    user: parseInt(userId),
                    startDate: task.startDate,
                }
            } else {
                updatedTask = {
                    id: task.id,
                    name,
                    desc,
                    priority,
                    workingHours,
                    status: "doing" as 'doing',
                    storyId: Id,
                    addDate: task.addDate,
                    user: parseInt(userId),
                    startDate: new Date().toISOString(),
                }
            }

        } else {
            updatedTask = {
                id: task.id,
                name,
                desc,
                priority,
                workingHours,
                status: "todo" as 'todo',
                storyId: Id,
                addDate: task.addDate,
            };
        }

        taskApi.update(updatedTask);
        navigate(`/story/${Id}/tasks`);
    }

    if (!task) {
        return <p>Loading...</p>;
    }

    return (
        <><div>
            <p className="mb-4 text-3xl">Add Task</p>
            <label htmlFor="name">Task"s name:</label>
            <input type="text" name="name" id="name" className="block" required defaultValue={task.name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="desc">Description:</label>
            <textarea name="desc" id="desc" className="block" defaultValue={task.desc} required onChange={(e) => setDesc(e.target.value)}></textarea>

            <label htmlFor="priority">Priority:</label>
            <select name="priority" id="priority" className="block text-black bg-gray-200" required defaultValue={task.priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>

            <label htmlFor="workingHours">Hours require to done task:</label>
            <input type="number" max={100} min={1} name="workingHours" id="workingHours" required className="block" defaultValue={task.workingHours} onChange={(e) => setWorkingHours(parseInt(e.target.value))} />

            <label htmlFor="user">Assign user to task:</label>
            <select name="user" id="user" className="block text-black bg-gray-200" defaultValue={userId} onChange={(e) => setUserId(e.target.value)}>
                <option value=""></option>
                {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name} {u.surname}</option>
                ))}
            </select>
            <button type="button" className="mt-3" onClick={editTask}>Edit Task</button>
        </div></>);
}

export default TaskEdit;
