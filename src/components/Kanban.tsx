import { Link, useParams } from "react-router-dom";
import ProjectApi from "../api/projectApi";
function Kanban() {
    const { storyId } = useParams() as { storyId: string }

    const tasks = ProjectApi.getTasksByStoryId(parseInt(storyId))
    return (
        <>
            <Link to={`/story/${storyId}/tasks`}><button>Tasks</button></Link>

            <div className="grid grid-cols-3 gap-4 p-4">
                <div className="border-2 border-black p-4 rounded-xl">
                    <p className="text-2xl mb-4 text-center">To do</p>
                    <div className="flex flex-col gap-2">
                        {tasks.map(task => (
                            <>
                                {task.status === "todo" && (
                                    <div key={task.id} className='border-2 border-black p-4 m-4'>
                                        <p className='text-2xl'>{task.name}</p>
                                        <p className='text-lg'>{task.desc}</p>
                                        <p className='text-lg'>Priority: {task.priority}</p>
                                        <p className='text-lg'>Working hours: {task.workingHours}</p>
                                        <p className='text-lg'>Status: {task.status}</p>
                                        <p className='text-lg'>Story id: {task.storyId}</p>
                                        <p className='text-lg'>Add date: {task.addDate}</p>
                                    </div>
                                )}
                            </>
                        ))
                        }
                    </div>
                </div>
                <div className="border-2 border-black p-4 rounded-xl">
                    <p className="text-2xl mb-4 text-center">Doing</p>
                    <div className="flex flex-col gap-2">
                        {tasks.map(task => (
                            <>
                                {task.status === "doing" && (
                                    <div key={task.id} className='border-2 border-black p-4 m-4'>
                                        <p className='text-2xl'>{task.name}</p>
                                        <p className='text-lg'>{task.desc}</p>
                                        <p className='text-lg'>Priority: {task.priority}</p>
                                        <p className='text-lg'>Working hours: {task.workingHours}</p>
                                        <p className='text-lg'>Status: {task.status}</p>
                                        <p className='text-lg'>Story id: {task.storyId}</p>
                                        <p className='text-lg'>Add date: {task.addDate}</p>
                                        {"user" in task && <p>User: {task.user}</p>}
                                        {"startDate" in task && <p>Start date: {task.startDate}</p>}
                                    </div>
                                )}
                            </>
                        ))
                        }
                    </div>
                </div>
                <div className="border-2 border-black p-4 rounded-xl">
                    <p className="text-2xl mb-4 text-center">Done</p>
                    <div className="flex flex-col gap-2">
                        {tasks.map(task => (
                            <>
                                {task.status === "done" && (
                                    <div key={task.id} className='border-2 border-black p-4 m-4'>
                                        <p className='text-2xl'>{task.name}</p>
                                        <p className='text-lg'>{task.desc}</p>
                                        <p className='text-lg'>Priority: {task.priority}</p>
                                        <p className='text-lg'>Working hours: {task.workingHours}</p>
                                        <p className='text-lg'>Status: {task.status}</p>
                                        <p className='text-lg'>Story id: {task.storyId}</p>
                                        <p className='text-lg'>Add date: {task.addDate}</p>
                                        {"user" in task && <p>User: {task.user}</p>}
                                        {"startDate" in task && <p>Start date: {task.startDate}</p>}
                                        {"endDate" in task && <p>End date: {task.endDate}</p>}
                                    </div>
                                )}
                            </>
                        ))
                        }
                    </div>
                </div>
            </div >


        </>
    );
}

export default Kanban;