import {Fragment, useContext, useEffect, useState} from "react";
import TaskColumn from "../../components/tasks/task-column";
import {TaskContext} from "../store/task-context";
import {Task_Status} from "../constants";
import TaskFilters from "./task-filters";

export default function TaskList(props: any) {
    const [tasks, setTasks] = useState([]);
    const taskCtx = useContext(TaskContext);
    const loadedTasks = taskCtx.filteredTasks;
    useEffect(() => {
        taskCtx.loadTasks();
    }, []);
    useEffect(() => {
        if (loadedTasks) {
            setTasks(loadedTasks);
        }
    }, [loadedTasks]);
    const getTasksByStatus = (status: string) => {
        return tasks.filter((task: any) => task.status === status);
    }
    return (
        <Fragment>
            <div className="flex flex-col my-5">
                <TaskFilters/>
                <div className="flex items-center mt-5 mb-10">
                    <div className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth">
                        {Task_Status.map(taskStatus => {
                            return <TaskColumn key={taskStatus} title={taskStatus}
                                               tasks={getTasksByStatus(taskStatus)}/>
                        })}
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
