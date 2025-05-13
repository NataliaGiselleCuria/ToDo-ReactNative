import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Item } from "../../types/types";
import { useListContext } from "../lists/ListContext";

interface ListContextType {
    addItem: (idList: number, newItem: Item) => void;
    updateItem: (idList: number, id: number, updated: Partial<Item>) => void;
    deleteItem: (idList: number, id: number) => void;
    getItemById: (isList: number, id: number) => Item | undefined;
}

const ItemContext = createContext<ListContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
    const { getListById, updateList, lists } = useListContext();

    const addItem = (idList: number, newItem: Item) => {
        const list = getListById(idList);
        if (!list) return;

        const updatedItems = [...list.items, newItem];
        updateList(idList, { items: updatedItems });
    };

    const updateItem = (idList: number, id: number, updated: Partial<Item>) => {
        const list = getListById(idList);
        if (!list) return;

        const updatedItems = list.items.map(item =>
            item.id === id ? { ...item, ...updated } : item
        );

        updateList(idList, { items: updatedItems });

    }

    const deleteItem = (idList: number, id: number) => {
        const list = getListById(idList);
        if (!list) return;

        const updatedItems = list.items.filter(item => item.id !== id);
        const updatedList = { ...list, items: updatedItems };

        updateList(idList, updatedList);

    }

    const getItemById = (idList: number, id: number): Item | undefined => {
        const list = getListById(idList);
        return list?.items.find(item => item.id === id);
    };

    const contextValue = useMemo(() => ({
        addItem,
        updateItem,
        deleteItem,
        getItemById
    }), [lists]);

    return (
        <ItemContext.Provider value={contextValue}>
            {children}
        </ItemContext.Provider>

    )

}

export const useItemContext = () => {
    const context = useContext(ItemContext);
    if (!context) throw new Error("useListContext must be used inside ListProvider");
    return context;
};