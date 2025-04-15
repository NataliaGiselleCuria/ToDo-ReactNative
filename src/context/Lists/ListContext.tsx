import React, { createContext, useContext, useMemo } from "react";
import { List } from "../../types/types";

interface ListContextType {
    lists: List[];
    addList: (newList: List) => void;
    updateList: (id: number, updated: Partial<List>) => void;
    deleteList: (id: number) => void;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({children}: {children: React.ReactNode}) => {
    const [lists, setLists] = React.useState<List[]>([]);

    const addList = (newList: List) => {
        setLists([...lists, newList]);

        console.log("lista nueva! - listas:" + lists)
        //Acá lógica para guardar la lista en MySql
        // try {
        //     await saveListToDB(newList); // lógica de guardar en la base
        //     setLists(prev => [...prev, newList]); // actualizar solo si guardó bien
        // } catch (err) {
        //     console.error("Error al guardar la lista:", err);
        //     Alert.alert("Error", "No se pudo guardar la lista. Verificá tu conexión.");
        // }

        
    };

    const updateList = (id: number, updated: Partial<List>) => {
        setLists(prevLists => prevLists.map(list => list.id === id ? {...list, ...updated} : list));
       
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

    const deleteList = (id: number) => {
        setLists(prevLists => prevLists.filter(list => list.id !== id));

        //Acá lógica para eliminar la lista    
        // try {
        //     await deleteListFromMySQL(id); // lógica de delete
        //     setLists(prev => prev.filter(list => list.id !== id));
        // } catch (err) {
        //     console.error("Error al eliminar la lista:", err);
        //     Alert.alert("Error", "No se pudo eliminar la lista.");
        // } 
    }

    const contextValue = useMemo(() => ({
        lists,
        addList,
        updateList,
        deleteList,
      }), [lists]);

    return(
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