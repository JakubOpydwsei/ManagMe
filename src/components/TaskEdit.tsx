import ProjectApi, {Task} from "../api/projectApi"
import { useNavigate } from "react-router-dom";
import { Auth } from "../api/Auth";
import { useParams } from "react-router-dom";

function TaskEdit() {

    const { storyId, taskId } = useParams() as { storyId: string, taskId: string }
    const prevTask = ProjectApi.getTaskById(parseInt(taskId))
    let users = new Auth().getUsers()
    users = users.filter(u => u.role !== "admin")
    const navigate = useNavigate()


    function editTask() {
        
        const name = (document.querySelector("#name") as HTMLInputElement).value
        const desc = (document.querySelector("#desc") as HTMLInputElement).value
        const priority = (document.querySelector("#priority") as HTMLSelectElement).value as "low" | "medium" | "high"
        const workingHours = (document.querySelector("#workingHours") as HTMLInputElement).value
        const userId = (document.querySelector("#user") as HTMLSelectElement).value
        const Id = parseInt(storyId)
        let startDate = new Date().toISOString()
        if(prevTask.startDate){
            startDate = prevTask.startDate
        }

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
                workingHours: parseInt(workingHours),
                status: "doing" as 'doing',
                storyId: Id,
                addDate: prevTask.addDate, //?
                user: parseInt(userId),
                startDate: startDate, //?
            }
        } else {
            task = {
                id: prevTask.id,
                name: name,
                desc: desc,
                priority: priority,
                workingHours: parseInt(workingHours),
                status: "todo" as 'todo',
                storyId: Id,
                addDate: prevTask.addDate, //?
            }
        }

        ProjectApi.editTask(task)
        navigate(`/story/${Id}/tasks`)


    }

    return (<><div>
        <p className="mb-4 text-3xl">Add Task</p>

        <label htmlFor="name">Task"s name:</label>
        <input type="text" name="name" id="name" className="block" defaultValue={prevTask.name}/>

        <label htmlFor="desc">Description:</label>
        <textarea name="desc" id="desc" className="block" defaultValue={prevTask.desc}></textarea>

        <label htmlFor="priority">Priority:</label>
        <select name="priority" id="priority" className="block text-black bg-gray-200" defaultValue={prevTask.priority}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
        </select>

        {/* Status - BARK!  wybór na podstawie dodania pracownika do Taska  */}

        <label htmlFor="workingHours">Hours require to done task:</label>
        <input type="number" max={100} min={1} name="workingHours" id="workingHours" className="block" defaultValue={prevTask.workingHours}/>

        <label htmlFor="user">Assign user to task:</label>
        <select name="user" id="user" className="block text-black bg-gray-200" defaultValue={prevTask.user}>
            <option value=""></option>
            {users.map(u => (
                <option key={u.id} value={u.id}>{u.name} {u.surname}</option>
            ))}
        </select>
        <button className="mt-3" onClick={editTask}>Edit Task</button>
    </div></>);
}

export default TaskEdit;