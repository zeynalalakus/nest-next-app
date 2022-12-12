import {useContext, useEffect, useState} from "react";
import {TaskContext} from "../../components/store/task-context";
import {useRouter} from "next/router";
import {deleteTask, updateTaskStatus} from "../../components/services/task.service";
import {ToastContext} from "../../components/store/toastContext";
import {AuthContext} from "../../components/store/auth-context";

export default function Backlog(props: any) {
    const [backlogTasks, setBacklogTasks] = useState([]);
    const taskCtx = useContext(TaskContext);
    const toastCtx = useContext(ToastContext);
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    const allTasks = taskCtx.tasks;
    const {tasksFetched} = taskCtx;
    const initialCheckOver = authCtx.initialCheckOver;
    useEffect(() => {
        if (initialCheckOver && props.protected && authCtx.isNotLoggedIn) {
            router.push('/auth');
        }
    }, [initialCheckOver]);
    useEffect(() => {
        if (!tasksFetched) {
            taskCtx.loadTasks();
        }
    }, [tasksFetched]);
    useEffect(() => {
        setBacklogTasks(allTasks.filter((task: any) => task.status === 'Backlog'));
    }, [taskCtx]);

    if (!backlogTasks) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    if (backlogTasks.length === 0) {
        return (
            <div className="flex flex-col justify-center py-5 border-secondary-content/20 items-center">
                <div className="flex flex-col gap-3">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold mb-5">Backlog</h1>
                    </div>
                </div>
                <div className="alert alert-success shadow-lg w-4/5">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6"
                             fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>No Tasks in Backlog. Good Job. &#128512;</span>
                    </div>
                </div>
            </div>
        )
    }

    const onEditTask = (task: any) => {
        taskCtx.onSetActiveTask(task.id);
        router.push('/tasks/edit-task');
    }
    const onMoveTaskToSpring = (task: any) => {
        updateTaskStatus(task.id, 'Ready').then(() => {
            toastCtx.setToastState({
                type: 'success',
                message: 'Task Status Changed'
            });
            taskCtx.loadTasks();
        }).catch((error: any) => {
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
    const onDeleteTask = (task: any) => {
        deleteTask(task.id,).then(() => {
            toastCtx.setToastState({
                type: 'success',
                message: 'Task Deleted Successfully'
            });
            taskCtx.loadTasks();
        }).catch((error: any) => {
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
        <div className="flex justify-center py-5 border-secondary-content/20">
            <div className="flex flex-col gap-3">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-5">Backlog</h1>
                </div>
                {backlogTasks.map((task: any) => {
                    return (
                        <div
                            className="flex flex-col bg-info rounded-box p-2 w-[300px] h-auto justify-between lg:flex-row lg:w-[1000px]"
                            key={task.id}>
                            <div className="text-black flex flex-row gap-2 w-[200px] whitespace-normal lg:w-[500px]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     className="stroke-current flex-shrink-0 w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>{task.title}</span>
                            </div>
                            <div>
                                <button onClick={() => onMoveTaskToSpring(task)}
                                        className="btn btn-success btn-sm tooltip tooltip-bottom mr-2"
                                        data-tip="Move to Sprint">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>

                                </button>
                                <button onClick={() => onEditTask(task)}
                                        className="btn btn-warning btn-sm tooltip tooltip-bottom mr-2"
                                        data-tip="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>

                                </button>
                                <button onClick={() => onDeleteTask(task)}
                                        className="btn btn-error btn-sm btn-sm tooltip tooltip-bottom mr-2"
                                        data-tip="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                    </svg>

                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export async function getStaticProps() {
    return {
        props: {
            protected: true
        }
    }
}
