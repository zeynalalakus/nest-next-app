import {useContext, useEffect} from "react";
import {AuthContext} from "../../components/store/auth-context";
import {useRouter} from "next/router";
import ProfilePage from "../../components/profile/profile-page";

export default function Profile(props: any) {
    const authCtx = useContext(AuthContext);
    const router = useRouter();
    const initialCheckOver = authCtx.initialCheckOver;
    useEffect(() => {
        if (initialCheckOver && props.protected && authCtx.isNotLoggedIn) {
            router.push('/auth');
        }
    }, [initialCheckOver]);
    return (
        <ProfilePage/>
    )
}
export async function getStaticProps() {
    return {
        props: {
            protected: true
        }
    }
}
