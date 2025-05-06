import React, { createContext, useContext, ReactNode, useState } from "react";
import { List } from "../../types/types";

export type CreateListData = Partial<List>;

type CreateListContextType = {
    listData: CreateListData;
    updateListData: (data: Partial<List>) => void;
    resetListData: () => void;
};

const CreateListContext = createContext<CreateListContextType | undefined>(undefined);

export const CreateListProvider = ({ children }: { children: ReactNode }) => {

    const [listData, setListData] = useState<CreateListData>({});

    const updateListData = (data: Partial<List>) => {
        setListData(prev => ({ ...prev, ...data }));
        
    };

    const resetListData = () => setListData({});

    return (
        <CreateListContext.Provider value={{ listData, updateListData, resetListData }}>
            {children}
        </CreateListContext.Provider>
    );
};

export const useCreateList = () => {
    const context = useContext(CreateListContext);
    if (!context) {
        throw new Error('useCreateListContext debe usarse dentro de CreateListProvider');
    }
    return context;
};