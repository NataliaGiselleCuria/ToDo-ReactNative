import React, { createContext, useContext, useState } from "react";
import { DefaultTheme, DarkTheme  } from '../styles/theme';

interface ThemeContextType {
    theme: typeof DefaultTheme;
    isDarkMode: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: DefaultTheme,
    isDarkMode: false,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [theme, setTheme] = useState(DefaultTheme); // Solo usamos Default por ahora

    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
        setTheme((prevTheme) => (prevTheme === DefaultTheme ? DarkTheme : DefaultTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook para acceder al tema en cualquier parte de la app
export const useTheme = () => useContext(ThemeContext);