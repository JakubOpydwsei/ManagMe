import { useState } from "react";
import ProjectApi, { Task } from "../api/projectApi"
import { useNavigate } from "react-router-dom";
import { Auth } from "../api/Auth";
import { useParams } from "react-router-dom";

function TaskEdit() {

    const { storyId, taskId } = useParams() as { storyId: string, taskId: string }
    const Id = parseInt(storyId)
    const prevTask = ProjectApi.getTaskById(parseInt(taskId))
    let users = new Auth().getUsers()
    users = users.filter(u => u.role !== "admin")
    const navigate = useNavigate()

    const [name, setName] = useState(prevTask.name)
    const [desc, setDesc] = useState(prevTask.desc)
    // const [priority,setPriority]= useState("low") as "low" | "medium" | "high"
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [workingHours, setWorkingHours] = useState(prevTask.workingHours)
    const [userId, setUserId] = useState('')


    let startDate = new Date().toISOString()
    let user: string | number = ""

    if ('startDate' in prevTask && prevTask.startDate) {
        startDate = prevTask.startDate;
    }
    if ('user' in prevTask && prevTask.user) {
        user = prevTask.user;
    }

    function editTask() {


        if (!name || !desc || !priority || !workingHours) {
            alert("Please fill required fields fields")
            return
        }

        let task: Task;
        if (userId !== "") {
            task = {
                id: prevTask.id,
                name: name,
                desc: desc,
                priority: priority,
                workingHours: workingHours,
                status: "doing" as 'doing',
                storyId: parseInt(storyId),
                addDate: prevTask.addDate,
                user: Id,
                startDate: startDate,
            }
        } else {
            task = {
                id: prevTask.id,
                name: name,
                desc: desc,
                priority: priority,
                workingHours: workingHours,
                status: "todo" as 'todo',
                storyId: Id,
                addDate: prevTask.addDate,
            }
        }

        ProjectApi.editTask(task)
        navigate(`/story/${Id}/tasks`)

    }

    return (<><div>
        <p className="mb-4 text-3xl">Add Task</p>

        <label htmlFor="name">Task"s name:</label>
        <input type="text" name="name" id="name" className="block" required defaultValue={prevTask.name} onChange={(e) => setName(e.target.value)}/>

        <label htmlFor="desc">Description:</label>
        <textarea name="desc" id="desc" className="block" defaultValue={prevTask.desc} required onChange={(e) => setDesc(e.target.value)}></textarea>

        <label htmlFor="priority">Priority:</label>
        <select name="priority" id="priority" className="block text-black bg-gray-200" required defaultValue={prevTask.priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
        </select>

        <label htmlFor="workingHours">Hours require to done task:</label>
        <input type="number" max={100} min={1} name="workingHours" id="workingHours" required className="block" defaultValue={prevTask.workingHours} onChange={(e) => setWorkingHours(parseInt(e.target.value))}/>

        <label htmlFor="user">Assign user to task:</label>
        <select name="user" id="user" className="block text-black bg-gray-200" defaultValue={user} onChange={(e) => setUserId(e.target.value)}>
            <option value=""></option>
            {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} {u.surname}</option>
            ))}
        </select>
        <button type="button" className="mt-3" onClick={editTask}>Edit Task</button>
    </div></>);
}

export default TaskEdit;