import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Item } from "../../types/types";
import { useListContext } from "../lists/ListContext";

type Result = { success: boolean; message?: string };

interface ListContextType {
    addItem: (idList: number, newItem: Item) => Promise<Result>;
    updateItem: (idList: number, id: number, updated: Partial<Item>) => Promise<Result>;
    deleteItem: (idList: number, id: number) => Promise<Result>;
    getItemById: (isList: number, id: number) => Item | undefined;
}

const ItemContext = createContext<ListContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
    const { getListById, updateList, lists } = useListContext();

    const addItem = async (idList: number, newItem: Item): Promise<Result> => {
        const list = getListById(idList);
        if (!list) return { success: false, message: 'No se encontró la lista para agregar el ítem' };

        const updatedItems = [...list.items, newItem];

        const result = await updateList(idList, { items: updatedItems });

        if (!result.success) {
            return { success: false, message: 'Error al agregar el ítem: ' + result.message }
        } else {
            return { success: true }
        }
    };

    const updateItem = async (idList: number, id: number, updated: Partial<Item>): Promise<Result> => {
        const list = getListById(idList);
        if (!list) return { success: false, message: 'No se encontró la lista para agregar el ítem' };

        const updatedItems = list.items.map(item =>
            item.id === id ? { ...item, ...updated } : item
        );

        const result = await updateList(idList, { items: updatedItems });

        if (!result.success) {
            return { success: false, message: 'Error al actualizar el ítem: ' + result.message }
        } else {
            return { success: true }
        }
    }

    const deleteItem = async (idList: number, id: number): Promise<Result> => {
        const list = getListById(idList);
         if (!list) return { success: false, message: 'No se encontró la lista para agregar el ítem' };

        const updatedItems = list.items.filter(item => item.id !== id);
        const updatedList = { ...list, items: updatedItems };

        const result = await  updateList(idList, updatedList);
       
         if (!result.success) {
            return { success: false, message: 'Error al actualizar el ítem: ' + result.message }
        } else {
            return { success: true }
        }

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