import { useState } from "react";
import { useApi } from "../contexts/ApiContext";
import { Task } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Auth } from "../api/Auth";
import { useParams } from "react-router-dom";
import MyInput from "./MyInput";
import { Form } from "react-bootstrap";
import MyButton from "./MyButton";
import { useAuth } from "../contexts/AuthContext";

function TaskAdd() {
    const { storyId } = useParams() as { storyId: string }
    let users = new Auth().getUsers()
    users = users.filter(u => u.role !== "admin")
    const { taskApi } = useApi()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [workingHours, setWorkingHours] = useState(0)
    const [userId, setUserId] = useState('')

    function addTask() {

        const validateForm = () => name.trim() !== '' && desc.trim() !== '' && priority.trim() !== '' && workingHours > 0;

        const Id = parseInt(storyId)

        if (!validateForm()) {
            alert("Please correctly fill required fields fields")
            return
        }

        let task: Task;
        if (userId !== "") {
            task = {
                id: Date.now(),
                name: name,
                desc: desc,
                priority: priority,
                workingHours: workingHours,
                status: "doing" as 'doing',
                storyId: Id,
                addDate: new Date().toISOString(),
                user: parseInt(userId),
                startDate: new Date().toISOString(),
            }
        } else {
            task = {
                id: Date.now(),
                name: name,
                desc: desc,
                priority: priority,
                workingHours: workingHours,
                status: "todo" as 'todo',
                storyId: Id,
                addDate: new Date().toISOString(),
            }
        }

        taskApi.add(task)
        navigate(`/story/${Id}/tasks`)


    }

    if (user?.role === 'guest') {
        return (<h1>As a guest you can't use this action</h1>)
    }

    return (<>
        <div>
            <h1 className="mb-4 text-3xl">Add Task</h1>

            <MyInput label={"Task's name:"} value={name} onChange={setName} />
            <MyInput label={"Description:"} value={desc} onChange={setDesc} type="textarea" />

            <Form.Group className="mb-4 m-auto">
                <Form.Label htmlFor="priority" className="">Priority:</Form.Label>
                <Form.Select
                    id="priority"
                    name="priority"
                    onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                    className="text-center"
                >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4 m-auto">
                <Form.Label htmlFor="hours">Hours require to done task:</Form.Label>
                <Form.Control
                    id="hours"
                    type={"number"}
                    value={workingHours}
                    onChange={(e) => setWorkingHours(parseInt(e.target.value))}
                    className="text-center"
                ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-4 m-auto">
                <Form.Label htmlFor="user">Assign user to task:</Form.Label>
                <Form.Select
                    id="user"
                    name="user"
                    onChange={(e) => setUserId(e.target.value)}
                    className="mb-4 m-auto text-center"
                >
                    <option value=""></option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>{u.name} {u.surname}</option>
                    ))}
                </Form.Select>
            </Form.Group>

            <MyButton text={"Add Task"} onClick={addTask} />

        </div>
    </>);
}

export default TaskAdd;