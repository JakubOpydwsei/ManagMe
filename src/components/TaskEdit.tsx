import { useState, useEffect } from "react"
import { useApi } from "../contexts/ApiContext";
import { Task } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Auth } from "../api/Auth";
import { useParams } from "react-router-dom";
import MyInput from "./MyInput";
import { Form } from "react-bootstrap";
import MyButton from "./MyButton";
import { useAuth } from "../contexts/AuthContext";

function TaskEdit() {
    const { storyId, taskId } = useParams() as { storyId: string, taskId: string }
    const Id = parseInt(storyId)
    const {user} = useAuth()
    const navigate = useNavigate()
    const [task, setTask] = useState<Task | null>(null)
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low")
    const [workingHours, setWorkingHours] = useState(0)
    const [userId, setUserId] = useState<string>('')

    let users = new Auth().getUsers()
    users = users.filter(u => u.role !== "admin")
    const { taskApi } = useApi()


    useEffect(() => {
        async function fetchTask() {
            const fetchedTask = await taskApi.getById(taskId)
            if (!fetchedTask) {
                return
            }
            setTask(fetchedTask)
            setName(fetchedTask.name)
            setDesc(fetchedTask.desc)
            setPriority(fetchedTask.priority)
            setWorkingHours(fetchedTask.workingHours)
            if ('user' in fetchedTask && fetchedTask.user) {
                setUserId(fetchedTask.user.toString())
            }
        }
    
        fetchTask()
    }, [taskId, taskApi])
    

    function editTask() {
        if (!task) {
            return
        }
        if (!name || !desc || !priority || !workingHours) {
            alert("Please fill required fields")
            return;
        }

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

        taskApi.update(updatedTask)
        navigate(`/story/${Id}/tasks`)
    }

    if (user?.role === 'guest' ) {
        return (<h1>As a guest you can't use this action</h1>)
    }

    if (!task) {
        return <h1>Loading...</h1>
    }

    return (
        <>
        <div>
            <h1 className="mb-4 text-3xl">Edit Task</h1>

            <MyInput label={"Task's name:"} value={name} onChange={setName} />
            <MyInput label={"Description:"} value={desc} onChange={setDesc} type="textarea" />

            <Form.Group className="mb-4 m-auto">
                <Form.Label htmlFor="priority" className="">Priority:</Form.Label>
                <Form.Select
                    id="priority"
                    name="priority"
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                    className="text-center"
                    value={priority}
                >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4 m-auto">
                <Form.Label>Hours require to done task:</Form.Label>
                <Form.Control
                    type={"number"}
                    value={workingHours}
                    onChange={(e) => setWorkingHours(parseInt(e.target.value))}
                    className="text-center"
                ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-4 m-auto">
                <Form.Label>Assign user to task:</Form.Label>
                <Form.Select
                    id="user"
                    name="user"
                    onChange={(e) => setUserId(e.target.value)}
                    className="mb-4 m-auto text-center"
                    value={userId}
                >
                    <option value=""></option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name} {u.surname}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <MyButton text={"Edit Task"} onClick={editTask} />
        </div></>);
}

export default TaskEdit;
