import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Item } from "../../types/types";
import { useListContext } from "../lists/ListContext";

interface ListContextType {
    updateItem: (idList: number, id: number, updated: Partial<Item>) => void;
    deleteItem: (idList: number, id: number) => void;
    getItemById: (isList: number, id: number) => Item | undefined;
}

const ItemContext = createContext<ListContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
    const { getListById, updateList, lists } = useListContext();

    const updateItem = (idList: number, id: number, updated: Partial<Item>) => {
        const list = getListById(idList);
        if (!list) return;

        const updatedItems = list.items.map(item =>
            item.id === id ? { ...item, ...updated } : item
        );

        updateList(idList, { items: updatedItems });

        //Acá lógica para actualizar la lista en MySql
        // try {
        //     await updateListInMySQL(id, updated); // lógica de update en base
        //     setLists(prev =>
        //         prev.map(list => list.id === id ? { ...list, ...updated } : list)
        //     );
        // } catch (err) {
        //     console.error("Error al actualizar la lista:", err);
        //     Alert.alert("Error", "No se pudo actualizar la lista.");
        // }
    }

    const deleteItem = (idList: number, id: number) => {
        const list = getListById(idList);
        if (!list) return;

        //Acá lógica para eliminar la lista    
        // try {
        //     await deleteListFromMySQL(id); // lógica de delete
        //     setLists(prev => prev.filter(list => list.id !== id));
        // } catch (err) {
        //     console.error("Error al eliminar la lista:", err);
        //     Alert.alert("Error", "No se pudo eliminar la lista.");
        // } 
    }

    const getItemById = (idList: number, id: number): Item | undefined => {
        const list = getListById(idList);
        return list?.items.find(item => item.id === id);   
    };

    const contextValue = useMemo(() => ({
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