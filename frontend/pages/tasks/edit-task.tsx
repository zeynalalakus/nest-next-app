import {useContext, useEffect, useState} from "react";
import {TaskContext} from "../../components/store/task-context";
import TaskCreateEdit from "../../components/tasks/task-create-edit";
import {AuthContext} from "../../components/store/auth-context";
import {useRouter} from "next/router";

export default function EditTask(props: any) {
    const [selectedTask, setSelectedTask] = useState(null);
    const taskCtx = useContext(TaskContext);
    const activeTask = taskCtx.activeTask;
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    const initialCheckOver = authCtx.initialCheckOver;
    useEffect(() => {
        if (initialCheckOver && props.protected && authCtx.isNotLoggedIn) {
            router.push('/auth');
        }
    }, [initialCheckOver]);

    useEffect(() => {
        setSelectedTask(activeTask);
    }, [activeTask]);

    if (!selectedTask) {
        return <div>
            <p>Loading...</p>
        </div>
    }

    return (
        <TaskCreateEdit mode='edit' selectedTask={selectedTask}></TaskCreateEdit>
    )
}
