import TaskList from "../../components/tasks/task-list";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../components/store/auth-context";
import {useRouter} from "next/router";

export default function TasksList(props: any) {
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    const initialCheckOver = authCtx.initialCheckOver;
    useEffect(() => {
        if (initialCheckOver && props.protected && authCtx.isNotLoggedIn) {
            router.push('/auth');
        }
    }, [initialCheckOver]);
    return (
        <TaskList/>
    )
}

export async function getStaticProps() {
    return {
        props: {
            protected: true
        }
    }
}
