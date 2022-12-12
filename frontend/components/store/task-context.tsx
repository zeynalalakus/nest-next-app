import {createContext, useContext, useEffect, useReducer} from "react";
import {getTasks} from "../services/task.service";
import {ToastContext} from "./toastContext";
import {AuthContext} from "./auth-context";

const defaultState = {
    tasks: [],
    filteredTasks: [],
    filters: {assignee: '', reviewer: '', tester: ''},
    tasksFetching: false,
    tasksFetched: false,
    loadTasks: () => {
    },
    activeTask: null,
    onSetActiveTask: (id: string) => {
    },
    onSetFilters: (filter: string, value: string) => {
    }
}

export const TaskContext = createContext(defaultState);

const taskReducer = (state: any, action: any) => {
    if (action.type === 'Load Tasks') {
        return {
            ...state,
            tasks: action.tasks,
            filteredTasks: action.tasks,
            tasksFetched: true,
            tasksFetching: false
        }
    } else if (action.type === 'Loading Tasks') {
        return {
            ...state,
            tasksFetching: true
        }
    } else if (action.type === 'Set Active Task') {
        const selectedTask = state.tasks.find((task: any) => task.id === action.taskId);
        return {
            ...state,
            activeTask: selectedTask
        }
    } else if (action.type === 'Set Filters') {
        const filters = state.filters;
        filters[action.filter] = action.value;
        return {
            ...state,
            filters
        }
    } else if (action.type === 'Filter Tasks') {
        const tasks = state.tasks;
        const {assignee, reviewer, tester} = state.filters;
        const filterTasks = tasks.filter((task: any) =>
            task.assignee.id.includes(assignee) &&
            task.reviewer.id.includes(reviewer) &&
            task.tester.id.includes(tester))
        return {
            ...state,
            filteredTasks: filterTasks
        }
    }
    return defaultState
}

export const TaskContextProvider = (props: any) => {
    const [taskState, dispatch] = useReducer(taskReducer, defaultState);
    const toastCtx = useContext(ToastContext);
    const authCtx = useContext(AuthContext);

    const onLoadTasks = () => {
        dispatch({type: 'Loading Tasks'})
        getTasks()
            .then(response => {
                dispatch({type: 'Load Tasks', tasks: response.data})
            })
            .catch(error => {
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
            })

    }
    const onSetActiveTask = (id: string) => {
        dispatch({type: 'Set Active Task', taskId: id})
    }
    const onSetFilters = (filter: string, value: string) => {
        dispatch({type: 'Set Filters', filter, value});
        dispatch({type: 'Filter Tasks'})
    }

    const state = {
        tasks: taskState.tasks,
        filters: taskState.filters,
        filteredTasks: taskState.filteredTasks,
        tasksFetching: taskState.taskFetching,
        tasksFetched: taskState.tasksFetched,
        activeTask: taskState.activeTask,
        loadTasks: onLoadTasks,
        onSetActiveTask: onSetActiveTask,
        onSetFilters: onSetFilters
    }

    return (
        <TaskContext.Provider value={state}>
            {props.children}
        </TaskContext.Provider>
    )


}
