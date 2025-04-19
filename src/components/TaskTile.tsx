import { CompleteTask, Task } from "../types/types";
import { Auth } from "../api/Auth";
import { formatDate } from "../utils/formatDate";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useApi } from "../contexts/ApiContext";
import { useState } from "react";

type TaskFormProps = {
    task: Task
}

function TaskTile({ task }: TaskFormProps) {

    const users = new Auth().getUsers()
    const { taskApi } = useApi()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tasks, setTasks] = useState<Task[] | null>(null)

    function deleteTask(id: number): void {
        console.log('reload')
            taskApi.delete(id)
            window.location.reload() // wywalić
        }
    
        async function markDone(task: Task): Promise<void> {
            if (!task) return;
    
            task.status = 'done'
    
            if (!('endDate' in task)) {
                (task as CompleteTask).endDate = new Date().toISOString();
            }
    
            taskApi.update(task)
            setTasks((prevTasks) =>
                prevTasks ? prevTasks.map((t) => (t.id === task.id ? task : t)) : []
            )
        }

    return (<>
        <Card className='w-full'>
            <Card.Body className="m-0 p-0">
                <Card.Text className="text-3xl pb-2">Name: {task.name}</Card.Text>
                <Card.Text className='text-xl pb-2'>
                    Desc: {task.desc}
                </Card.Text>
                <Card.Text className='text-xl pb-2'>
                    Priority: {task.priority}
                </Card.Text>
                <Card.Text className='text-xl pb-2'>
                    Working hours: {task.workingHours}
                </Card.Text>
                <Card.Text className='text-xl pb-2'>
                    Status: {task.status}
                </Card.Text>
                <Card.Text className='text-xl pb-2'>
                    Story ID: {task.storyId}
                </Card.Text>

                {"user" in task && task.user && (
                    <Card.Text className='text-xl pb-2'>
                        Employee: {users.find(u => u.id === task.user)?.surname} {users.find(u => u.id === task.user)?.name}
                    </Card.Text>
                )}

                <Card.Text className='text-xl pb-2'>
                    Add date: {formatDate(task.addDate)}
                </Card.Text>

                {"startDate" in task && task.startDate && (
                    <Card.Text className='text-xl pb-2'>
                        Start date: {formatDate(task.startDate)}
                    </Card.Text>
                )}
                {"endDate" in task && task.endDate && (
                    <Card.Text className='text-xl pb-2'>
                        End date: {formatDate(task.endDate)}
                    </Card.Text>
                )}

                <div className="w-full grid grid-cols-2 gap-2 mt-2">
                    <Button variant="danger" onClick={() => deleteTask(task.id)}>
                        Delete
                    </Button>

                    <Link to={`/story/${task.storyId}/task/edit/${task.id}`} className="btn btn-secondary">
                        Edit
                    </Link>
                    {task.status !== 'done' && "user" in task && task.user && <Button className='col-span-2' variant="primary" onClick={() => markDone(task)}>
                        Mark as done
                    </Button>}
                </div>
            </Card.Body>
        </Card>

    </>);
}

export default TaskTile;