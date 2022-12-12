import TaskCreateEdit from "../../components/tasks/task-create-edit";
import {useContext, useEffect} from "react";
import {AuthContext} from "../../components/store/auth-context";
import {useRouter} from "next/router";

export default function CreateTask(props: any) {
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    const initialCheckOver = authCtx.initialCheckOver;
    useEffect(() => {
        if (initialCheckOver && props.protected && authCtx.isNotLoggedIn) {
            router.push('/auth');
        }
    }, [initialCheckOver]);
    return (
        <TaskCreateEdit mode='create'></TaskCreateEdit>
    )
}

export async function getStaticProps() {
    return {
        props: {
            protected: true
        }
    }
}
