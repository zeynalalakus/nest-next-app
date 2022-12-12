import {createContext, useEffect, useReducer} from "react";
import {useRouter} from "next/router";

const defaultAuthState = {
    isLoggedIn: false,
    user: null,
    isNotLoggedIn: true,
    initialCheckOver: false,
    onLogin: (user: any) => {
    },
    onLogout: () => {
    },
    onUpdateUser: (user: any) => {}
}
export const AuthContext = createContext(defaultAuthState);


const authReducer = (state: any, action: any) => {
    if (action.type === 'LOGIN') {
        return {
            isLoggedIn: true,
            user: action.userData,
            isNotLoggedIn: false
        }
    } else if (action.type === 'LOGOUT') {
        return {
            isLoggedIn: false,
            user: null,
            isNotLoggedIn: true
        }
    } else if (action.type === 'UPDATE USER') {
        return {
            ...state,
            user: action.userDate
        }
    } else if (action.type === 'INITIAL_CHECK_OVER') {
        return {
            ...state,
            initialCheckOver: true
        }
    } else {
        return defaultAuthState;
    }
}

export const AuthContextProvider = (props: any) => {
    const router = useRouter();
    const [authState, dispatch] = useReducer(authReducer, defaultAuthState)

    useEffect(() => {
        const user = sessionStorage.getItem('Auth');
        if (user) {
            dispatch({type: 'LOGIN', userData: JSON.parse(user)});
            router.push('/');
        }
        dispatch({type: 'INITIAL_CHECK_OVER'});
    }, []);

    const loginHandler = (user: any) => {
        sessionStorage.setItem('Auth', JSON.stringify(user));
        sessionStorage.setItem('access_token', JSON.stringify(user.access_token));
        dispatch({type: 'LOGIN', userData: user});
        router.push('/');
    }
    const updateHandler = (user: any) => {
        sessionStorage.setItem('Auth', JSON.stringify(user));
        dispatch({type: 'UPDATE USER', userDate: user});
    }

    const logoutHandler = () => {
        sessionStorage.removeItem('Auth');
        sessionStorage.removeItem('access_token');
        dispatch({type: 'LOGOUT'});
        router.push('/auth');

    }

    const authContext = {
        isLoggedIn: authState.isLoggedIn,
        user: authState.user,
        isNotLoggedIn: authState.isNotLoggedIn,
        initialCheckOver: authState.initialCheckOver,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onUpdateUser: updateHandler
    }

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}


