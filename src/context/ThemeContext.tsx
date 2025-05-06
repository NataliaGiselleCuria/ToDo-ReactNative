import React, { createContext, useContext, useState } from "react";
import { themes } from '../styles/theme';
import { ThemeId } from "../types/types";

interface ThemeContextType {
    theme: typeof themes.default;
    currentThemeId: ThemeId;
    setThemeById: (id: ThemeId) => void;
    modalCount: number,
    incrementModalCount: () => void,
    decrementModalCount: () => void,
}

const ThemeContext = createContext<ThemeContextType>({
    theme: themes.default,
    currentThemeId: 'default',
    setThemeById: () => { },
    modalCount: 0,
    incrementModalCount: () => { },
    decrementModalCount: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [modalCount, setModalCount] = useState(0);
    const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('default');
    const theme = themes[currentThemeId]; // Solo usamos Default por ahora

    const setThemeById = (id: ThemeId) => {
        if (themes[id]) {
            setCurrentThemeId(id);
        }
    };

    const incrementModalCount = () => {
        setModalCount((prevCount) => prevCount + 1);
    };

    const decrementModalCount = () => {
        setModalCount((prevCount) => Math.max(0, prevCount - 1));
    }

    return (
        <ThemeContext.Provider value={{ theme, currentThemeId, setThemeById, modalCount, incrementModalCount, decrementModalCount  }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext); 