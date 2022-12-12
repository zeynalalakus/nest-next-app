import {Fragment, useContext, useEffect, useState} from "react";
import Navbar from './navbar'
import Footer from './footer'
import {ToastContext} from "../store/toastContext";
import Modal from "../modals/modal";
import {ThemeContext} from "../store/theme-context";

export default function Layout(props: any) {
    const [theme, setTheme] = useState('dark');
    const toastCtx = useContext(ToastContext);
    const themeCtx = useContext(ThemeContext);
    const activeTheme = themeCtx.theme;
    useEffect(() => {
        setTheme(activeTheme);
    }, [activeTheme]);
    const showToast = toastCtx.show;
    const duration = toastCtx.duration;
    useEffect(() => {
        const timer = setTimeout(() => {
            toastCtx.hideToast();
        }, duration);
        return () => clearTimeout(timer);
    }, [showToast])
    return <div data-theme={theme}>
        <Navbar/>
        <main className="h-full">{props.children}</main>
        {showToast && <div className="toast toast-bottom toast-end">
            <div className={`alert alert-${toastCtx.type}`}>
                <div>
                    <span>{toastCtx.message}</span>
                </div>
            </div>
        </div>}
        <Footer/>
    </div>
}
