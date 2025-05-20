import React, { createContext, useMemo, useState } from "react";

interface UserContextType {
   
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserConfigProvider = ({ children }: { children: React.ReactNode }) => {
   

    const contextValue = useMemo(() => ({
       
    }), []);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>

    )
}