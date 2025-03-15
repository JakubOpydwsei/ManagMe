import ProjectApi, {Task} from "../api/projectApi"
import { useNavigate } from "react-router-dom";
import { Auth } from "../api/Auth";
import { useParams } from "react-router-dom";

function TaskAdd() {
    const { storyId } = useParams() as { storyId: string }
    let users = new Auth().getUsers()
    users = users.filter(u => u.role !== "admin")
    const navigate = useNavigate()

    function addTask() {
        const name = (document.getElementById("name") as HTMLInputElement).value
        const desc = (document.getElementById("desc") as HTMLInputElement).value
        const priority = (document.getElementById("priority") as HTMLSelectElement).value as "low" | "medium" | "high"
        const workingHours = (document.getElementById("workingHours") as HTMLInputElement).value
        const userId = (document.getElementById("user") as HTMLSelectElement).value
        const Id = parseInt(storyId)

        // if (!name || !desc || !priority || !workingHours) {
        //     alert("Please fill required fields fields")
        //     return
        // }

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
                    <input type="text" name="name" id="name" className="block" />
                    
                    <label htmlFor="desc">Description:</label>
                    <textarea name="desc" id="desc" className="block"></textarea>
                    
                    <label htmlFor="priority">Priority:</label>
                    <select name="priority" id="priority" className="block text-black bg-gray-200">
                        <option value="low">low</option>
                        <option value="medium">medium</option>
                        <option value="high">high</option>
                    </select>

                    {/* Status - BARK!  wybór na podstawie dodania pracownika do Taska  */}

                    <label htmlFor="workingHours">Hours require to done task:</label>
                    <input type="number" max={100} min={1} name="workingHours" id="workingHours" className="block" />

                    <label htmlFor="user">Assign user to task:</label>
                    <select name="user" id="user" className="block text-black bg-gray-200">
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