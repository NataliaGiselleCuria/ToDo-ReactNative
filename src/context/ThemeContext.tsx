import React, { createContext, useContext, useState } from "react";
import { themes } from '../styles/theme';
import { ThemeId } from "../types/types";

interface ThemeContextType {
    theme: typeof themes.default;
    currentThemeId: ThemeId;
    setThemeById: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: themes.default,
    currentThemeId: 'default',
    setThemeById: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('default');
    const theme = themes[currentThemeId]; // Solo usamos Default por ahora

    const setThemeById = (id: ThemeId) => {
        if (themes[id]) {
            setCurrentThemeId(id);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, currentThemeId, setThemeById }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);