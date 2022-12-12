import {createContext, useReducer} from "react";

const initialToastState = {
    type: '',
    message: '',
    show: false,
    duration: 2000,
    setToastState: (data: { type: string, message: string, duration?: string }) => {
    },
    hideToast: () => {
    }
}

export const ToastContext = createContext(initialToastState);

const reducer = (state: any, action: any) => {
    if (action.type === 'hide') {
        return {
            ...state,
            show: false
        };
    }
    if (action.type === 'set') {
        return {
            ...action.data,
            show: true,
            duration: 2000
        };
    }
    return {
        type: action.type,
        message: action.message,
        show: true,
        duration: 2000
    };
}

export const ToastContextProvider = (props: any) => {
    const [toastState, setToastState] = useReducer(reducer, initialToastState)

    const setStateFn = (data: any) => {
        setToastState({type: 'set', data});
    }
    const hideToast = () => {
        setToastState({type: 'hide'});
    }


    return (
        <ToastContext.Provider value={{
            type: toastState.type,
            message: toastState.message,
            show: toastState.show,
            duration: toastState.duration,
            setToastState: setStateFn,
            hideToast: hideToast
        }}>
            {props.children}
        </ToastContext.Provider>
    )
}
