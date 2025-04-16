import { Task } from "../types/types";
import { Auth } from "../api/Auth";
import { formatDate } from "../utils/formatDate";

type TaskFormProps = {
    task: Task
}

function TaskTile({ task }: TaskFormProps,) {

    const users = new Auth().getUsers()

    return (<>
        <div
            key={task.addDate}
            className="border-2 border-gray-300 rounded-xl p-6 m-4 text-white"
        >
            <p className="text-2xl mb-2">Name: {task.name}</p>
            <p className="text-lg mb-1">Desc: {task.desc}</p>
            <p className="text-lg mb-1">Priority: {task.priority}</p>
            <p className="text-lg mb-1">Working hours: {task.workingHours}</p>
            <p className="text-lg mb-1">Status: {task.status}</p>
            <p className="text-lg mb-1">Story id: {task.storyId}</p>
            <p className="text-lg mb-1">Add date: {formatDate(task.addDate)}</p>
            {"user" in task && task.user && (
                <p className="text-lg mb-1">
                    Employee: {users.find(u => u.id === task.user)?.surname} {users.find(u => u.id === task.user)?.name}
                </p>
            )}
            {"startDate" in task && task.startDate && (
                <p className="text-lg mb-1">Start date: {formatDate(task.startDate)}</p>
            )}
            {"endDate" in task && task.endDate && (
                <p className="text-lg mb-1">End date: {formatDate(task.endDate)}</p>
            )}
        </div>

    </>);
}

export default TaskTile;