import TaskItem from "./task-item";
import {Fragment, useContext, useState} from "react";
import Modal from "../modals/modal";
import TaskCreateEdit from "./task-create-edit";
import {Task_Status} from "../constants";
import {updateTaskStatus} from "../services/task.service";
import {ToastContext} from "../store/toastContext";
import {AuthContext} from "../store/auth-context";
import {TaskContext} from "../store/task-context";

export default function TaskColumn(props: { title: string, tasks: any }) {
    const [selectedTask, setSelectedTask] = useState<any>(null);
    const toastCtx = useContext(ToastContext);
    const authCtx = useContext(AuthContext);
    const taskCtx = useContext(TaskContext);

    function setNewStatus(task: any, num: number) {
        const currentStatusIndex = Task_Status.findIndex(status => status === task.status);
        const newStatusIndex = currentStatusIndex + num;
        const newStatus = Task_Status[newStatusIndex];
        updateTaskStatus(task.id, newStatus).then(response => {
            toastCtx.setToastState({
                type: 'success',
                message: 'Task Status Changed'
            });
            taskCtx.loadTasks();
        }).catch(error => {
            if (error.response.status === 401) {
                toastCtx.setToastState({
                    type: 'danger',
                    message: 'Unauthorized'
                });
                authCtx.onLogout();
            } else {
                toastCtx.setToastState({
                    type: 'danger',
                    message: error.response.data.message
                })
            }
        })
    }

    return (
        <Fragment>
            <div className="card bg-neutral text-neutral-content w-[400px] h-[600px] inline-block m-3
                 overflow-y-scroll scroll whitespace-nowrap scroll-smooth">
                <div className="card w-[350px] h-[75px] bg-primary text-primary-content m-3 justify-center">
                    <div className="card-body items-center">
                        <h1 className="card-title text-white text-3xl">{props.title}</h1>
                    </div>
                </div>
                {props.tasks.map((task: any) => <TaskItem key={task.id} title={task.title}
                                                          status={task.status}
                                                          task={task}
                                                          onShowDetails={() => setSelectedTask(task)}
                                                          onDowngradeStatus={(task: any) => setNewStatus(task, -1)}
                                                          onUpgradeStatus={(task: any) => setNewStatus(task, 1)}/>)}
                {selectedTask && <Modal modalId="task-detail-modal" title={selectedTask.title}>
                    <div>
                        <TaskCreateEdit mode="edit" selectedTask={selectedTask}></TaskCreateEdit>
                    </div>
                    <div></div>
                </Modal>}
            </div>
        </Fragment>
    )
}
