import { createContext, ReactNode, useContext, useState } from 'react'

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => {}
})



export function ThemeProvider({children} : {children : ReactNode}) {

    const [theme, setTheme] = useState<'dark' | 'light'>('dark')

    const toggleTheme = () => {
        setTheme((prev: string) => (prev === 'dark' ? 'light' : 'dark'))
    }

    return ( <ThemeContext.Provider value={{theme,toggleTheme}}>
        <div data-bs-theme={theme}>
            {children}
        </div>
    </ThemeContext.Provider> );
}

export const useTheme = () => useContext(ThemeContext)