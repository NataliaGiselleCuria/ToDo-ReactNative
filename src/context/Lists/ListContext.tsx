import React, { createContext, useContext, useMemo } from "react";
import { List } from "../../types/types";

type Result = { success: boolean; message?: string };

interface ListContextType {
    lists: List[];
    addList: (newList: List) => Promise<Result>;
    updateList: (id: number, updated: Partial<List>) => Promise<Result>;
    deleteList: (id: number) => Promise<Result>;
    getListById: (id: number) => List | undefined;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({ children }: { children: React.ReactNode }) => {
    const [lists, setLists] = React.useState<List[]>([]);

    const addList = async (newList: List): Promise<Result> => {
        try {
            // await saveListToDB(newList);
            setLists([...lists, newList]);
            return { success: true };

        } catch (err) {
            return { success: false, message: 'Error al guardar la lista: ' };
        }
    }

    const updateList = async (id: number, updated: Partial<List>): Promise<Result> => {
        try {
            // await updateListInDB(id, updated);
            setLists(prevLists => prevLists.map(list => list.id === id ? { ...list, ...updated } : list));
            return { success: true };
        } catch (err) {
            return { success: false, message: 'Error al actualizar la lista: ' + err };
        }
    }

    const deleteList = async (id: number): Promise<Result> => {
        try {
            // await deleteListFromDB(id);
            setLists(prevLists => prevLists.filter(list => list.id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, message: 'Error al eliminar la lista: ' + err };
        }
    }

    const getListById = (id: number) => {
        return lists.find(list => list.id === id);
    }

    const contextValue = useMemo(() => ({
        lists,
        addList,
        updateList,
        deleteList,
        getListById,
    }), [lists]);

    return (
        <ListContext.Provider value={contextValue}>
            {children}
        </ListContext.Provider>

    )

}

export const useListContext = () => {
    const context = useContext(ListContext);
    if (!context) throw new Error("useListContext must be used inside ListProvider");
    return context;
};