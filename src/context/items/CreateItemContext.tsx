import React, { createContext, useContext, ReactNode, useState } from "react";
import { Item } from "../../types/types";

type CreateItemData = Partial<Item>;

type CreateItemContextType = {
    itemData: CreateItemData;
    updateItemData: (data: Partial<Item>) => void;
    resetItemData: () => void;
};

const CreateItemContext = createContext<CreateItemContextType | undefined>(undefined);

export const CreateItemProvider = ({ children }: { children: ReactNode }) => {

    const [itemData, setItemData] = useState<CreateItemData>({});

    const updateItemData = (data: Partial<Item>) => {
        setItemData(prev => ({ ...prev, ...data }));
    };

    const resetItemData = () => setItemData({});

    return (
        <CreateItemContext.Provider value={{ itemData, updateItemData, resetItemData }}>
            {children}
        </CreateItemContext.Provider>
    );
};

export const useCreateItem = () => {
    const context = useContext(CreateItemContext);
    if (!context) {
        throw new Error('useCreateItemContext debe usarse dentro de CreateItemProvider');
    }
    return context;
};