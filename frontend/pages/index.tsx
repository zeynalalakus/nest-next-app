import {useContext, useEffect} from "react";
import {AuthContext} from "../components/store/auth-context";
import {useRouter} from "next/router";
import HomePage from "../components/home/home-page";

export default function Home(props: any) {
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    const initialCheckOver = authCtx.initialCheckOver;
    useEffect(() => {
        if (initialCheckOver && props.protected && authCtx.isNotLoggedIn) {
            router.push('/auth');
        }
    }, [initialCheckOver]);
    return (
        <HomePage/>
    )
}

export async function getStaticProps() {
    return {
        props: {
            protected: true
        }
    }
}
