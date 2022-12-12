import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../components/store/auth-context";
import {useRouter} from "next/router";
import AuthPage from "../../components/auth/auth-page";

export default function Home(props: any) {
    const authCtx = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (authCtx.isLoggedIn) {
            router.back();
        }
    }, []);

    return (
        <AuthPage/>
    )
}
