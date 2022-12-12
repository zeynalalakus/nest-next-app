import {createContext, useEffect, useState} from "react";

const defaultState = {
    theme: 'dark',
    onSetTheme: (theme: string) => {}
}

export const ThemeContext = createContext(defaultState);

export const ThemeContextProvider = (props: any) => {
    const [activeTheme, setActiveTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = sessionStorage.getItem('theme');
        if (savedTheme) {
            setActiveTheme(savedTheme);
        }
    }, []);

    const onSetTheme = (theme: string) => {
        sessionStorage.setItem('theme', theme);
        setActiveTheme(theme);
    }

    const state = {
        theme: activeTheme,
        onSetTheme
    }

    return (
        <ThemeContext.Provider value={state}>
            {props.children}
        </ThemeContext.Provider>
    )
}
