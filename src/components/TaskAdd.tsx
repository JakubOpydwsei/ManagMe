import { useState } from "react";
import ProjectApi, {Task} from "../api/projectApi"
import { useNavigate } from "react-router-dom";
import { Auth } from "../api/Auth";
import { useParams } from "react-router-dom";

function TaskAdd() {
    const { storyId } = useParams() as { storyId: string }
    let users = new Auth().getUsers()
    users = users.filter(u => u.role !== "admin")
    const navigate = useNavigate()

    const [name,setName]= useState('')
    const [desc,setDesc]= useState('')
    // const [priority,setPriority]= useState("low") as "low" | "medium" | "high"
    const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
    const [workingHours,setWorkingHours]= useState('')
    const [userId,setUserId]= useState('')

    function addTask() {

        const validateForm = () => name.trim() !== '' && desc.trim() !== '' && priority.trim() !== '' && workingHours.trim() !== '';

        const Id = parseInt(storyId)

        if (!validateForm()) {
            alert("Please fill required fields fields")
            return
        }

        let task: Task;
        if (userId !== "") {
            task = {
                id: Date.now(),
                name: name,
                desc: desc,
                priority: priority,
                workingHours: parseInt(workingHours),
                status: "doing" as 'doing',
                storyId: Id,
                addDate: new Date().toISOString(), //?
                user: parseInt(userId),
                startDate: new Date().toISOString(), //?
            }
        } else {
            task = {
                id: Date.now(),
                name: name,
                desc: desc,
                priority: priority,
                workingHours: parseInt(workingHours),
                status: "todo" as 'todo',
                storyId: Id,
                addDate: new Date().toISOString(), //?
            }
        }

        ProjectApi.addTask(task)
        navigate(`/story/${Id}/tasks`)
        

    }

    return (<>
        <div>
                    <p className="mb-4 text-3xl">Add Task</p>

                    <label htmlFor="name">Task"s name:</label>
                    <input type="text" name="name" id="name" className="block" onChange={(e) => setName(e.target.value)}/>
                    
                    <label htmlFor="desc">Description:</label>
                    <textarea name="desc" id="desc" className="block" onChange={(e) => setDesc(e.target.value)}></textarea>
                    
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority" className="block text-black bg-gray-200" onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>

                    <label htmlFor="workingHours">Hours require to done task:</label>
                    <input type="number" max={100} min={1} name="workingHours" id="workingHours" className="block" onChange={(e) => setWorkingHours(e.target.value)}/>

                    <label htmlFor="user">Assign user to task:</label>
                    <select name="user" id="user" className="block text-black bg-gray-200" onChange={(e) => setUserId(e.target.value)}>
                        <option value=""></option>
                        {users.map(u => (
                            <option key={u.id} value={u.id}>{u.name} {u.surname}</option>
                        ))}
                    </select>
                    <button className="mt-3" onClick={addTask}>Add Task</button>
                </div>
    </>);
}

export default TaskAdd;