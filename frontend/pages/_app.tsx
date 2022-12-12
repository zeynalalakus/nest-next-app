import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from "../components/layout/layout";
import {ToastContextProvider} from "../components/store/toastContext";
import {AuthContextProvider} from "../components/store/auth-context";
import {TaskContextProvider} from "../components/store/task-context";
import {ThemeContextProvider} from "../components/store/theme-context";

export default function App({Component, pageProps}: AppProps) {
    return (
        <AuthContextProvider>
            <ThemeContextProvider>
                <ToastContextProvider>
                    <TaskContextProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </TaskContextProvider>
                </ToastContextProvider>
            </ThemeContextProvider>
        </AuthContextProvider>
    )
}
