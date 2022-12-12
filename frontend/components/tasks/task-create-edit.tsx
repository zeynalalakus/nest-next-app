import {useContext, useEffect, useState} from "react";
import {ToastContext} from "../store/toastContext";
import {AuthContext} from "../store/auth-context";
import {createTasks, deleteTask, updatedTask} from "../services/task.service";
import {TaskContext} from "../store/task-context";
import {useRouter} from "next/router";
import {getUsersByRole} from "../services/user.service";

export default function TaskCreateEdit(props: any) {
    const [developers, setDevelopers] = useState([]);
    const [managers, setManagers] = useState([]);
    const [testers, setTesters] = useState([]);
    const toastCtx = useContext(ToastContext);
    const authCtx = useContext(AuthContext);
    const taskCtx = useContext(TaskContext);
    const router = useRouter();
    const [taskTitle, setTaskTitle] = useState(setInitialValue((value: any) => value.title));
    const [taskDescription, setTaskDescription] = useState(setInitialValue((value: any) => value.description));
    const [taskDueDate, setTaskDueDate] = useState(setInitialValue((value: any) => value.dueDate));
    const [taskReviewer, setTaskReviewer] = useState(setInitialValue((value: any) => value.reviewer.id));
    const [taskAssignee, setTaskAssignee] = useState(setInitialValue((value: any) => value.assignee.id));
    const [taskTester, setTaskTester] = useState(setInitialValue((value: any) => value.tester.id));
    function setInitialValue(fn: any): string {
        if (props.mode === 'edit') {
            return fn(props.selectedTask);
        }
        return '';
    }

    useEffect(() => {
        getUsersByRole('Developer')
            .then(response => {
                setDevelopers(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    toastCtx.setToastState({
                        type: 'danger',
                        message: 'Unauthorized'
                    });
                    authCtx.onLogout();
                } else {
                    toastCtx.setToastState({
                        type: 'danger',
                        message: 'Could not fetch developers'
                    })
                }

            });
        getUsersByRole('Tester')
            .then(response => {
                setTesters(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    toastCtx.setToastState({
                        type: 'danger',
                        message: 'Unauthorized'
                    });
                    authCtx.onLogout();
                } else {
                    toastCtx.setToastState({
                        type: 'danger',
                        message: 'Could not fetch testers'
                    })
                }
            });
        getUsersByRole('Manager')
            .then(response => {
                setManagers(response.data);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    toastCtx.setToastState({
                        type: 'danger',
                        message: 'Unauthorized'
                    });
                    authCtx.onLogout();
                } else {
                    toastCtx.setToastState({
                        type: 'danger',
                        message: 'Could not fetch managers'
                    })
                }
            });
    }, []);


    const taskCreateHandler = (payload: any) => {
        createTasks(payload).then(response => {
            toastCtx.setToastState({
                type: 'success',
                message: 'Task Created Successfully'
            });
            taskCtx.loadTasks();
            router.push('/tasks/backlog')
        }).catch(error => {
            checkError(error);
        })
    }
    const taskEditHandler = (payload: any) => {
        updatedTask(props.selectedTask.id, payload).then(response => {
            toastCtx.setToastState({
                type: 'success',
                message: 'Task Updated Successfully'
            });
            taskCtx.loadTasks();
            router.push('/tasks')
        }).catch(error => {
            checkError(error);
        })
    }
    const onDeleteTask = () => {
        deleteTask(props.selectedTask.id).then(response => {
            toastCtx.setToastState({
                type: 'success',
                message: 'Task Deleted Successfully'
            });
            taskCtx.loadTasks();
            router.back();
        }).catch(error => {
            checkError(error);
        })
    }

    const checkError = (error: any) => {
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
    }

    const onSubmit = () => {
        if (!taskTitle || !taskDescription || !taskDueDate) {
            toastCtx.setToastState({
                type: 'danger',
                message: 'Title, Description and Due Date Fields are required'
            })
            return;
        }
        const payload = {
            title: taskTitle,
            description: taskDescription,
            dueDate: taskDueDate,
            assignee: taskAssignee,
            reviewer: taskReviewer,
            tester: taskTester
        };
        if (props.mode === 'create') {
            taskCreateHandler(payload);
        } else {
            taskEditHandler(payload);
        }
    }

    return (
        <div className="flex justify-center py-5 border-secondary-content/20">
            <div className="flex flex-col gap-3">
                <div className="text-center">
                    <h1 className="text-5xl font-bold mb-5">{props.mode === 'create' ? 'Create' : 'Edit'} Task</h1>
                </div>
                <div className="form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Title*</span>
                    </label>
                    <input value={taskTitle} type="text" placeholder="Type here" onChange={($event) => setTaskTitle($event.target.value)}
                           className="input input-bordered text-lg"/>
                </div>
                <div className="form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Description*</span>
                    </label>
                    <textarea value={taskDescription} placeholder="Type here" onChange={($event) => setTaskDescription($event.target.value)}
                              className="input input-bordered text-lg h-[100px]" rows={5}></textarea>
                </div>
                <div className=" form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Due Date*</span>
                    </label>
                    <input value={taskDueDate} type="date" placeholder="Type here" onChange={($event) => setTaskDueDate($event.target.value)}
                           className="input input-bordered text-lg"/>
                </div>
                <div className=" form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Assignee*</span>
                    </label>
                    <select value={taskAssignee} className="select select-bordered text-lg" onChange={($event) => setTaskAssignee($event.target.value)}>
                        <option value="">Select one</option>
                        {developers.map((developer: any) => <option value={developer.id}
                                                                    key={developer.id}>{developer.username}</option>)}
                    </select>
                </div>
                <div className=" form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Reviewer*</span>
                    </label>
                    <select value={taskReviewer} className="select select-bordered text-lg" onChange={($event) => setTaskReviewer($event.target.value)}>
                        <option value="">Select one</option>
                        {managers.map((manager: any) => <option value={manager.id}
                                                                key={manager.id}>{manager.username}</option>)}
                    </select>
                </div>
                <div className=" form-control w-[600px]">
                    <label className="label">
                        <span className="label-text text-xl">Tester*</span>
                    </label>
                    <select value={taskTester} className="select select-bordered text-lg" onChange={($event) => setTaskTester($event.target.value)}>
                        <option value="">Select one</option>
                        {testers.map((tester: any) => <option value={tester.id}
                                                              key={tester.id}>{tester.username}</option>)}
                    </select>
                </div>
                <div className="text-center flex justify-around mt-3">

                    {props.mode === 'edit' && <button onClick={onDeleteTask} className="btn btn-error text-xl">Delete</button>}
                    <button onClick={onSubmit} className="btn btn-success text-xl">{props.mode === 'create' ? 'Create' : 'Edit'}</button>

                </div>
            </div>
        </div>
    )
}
