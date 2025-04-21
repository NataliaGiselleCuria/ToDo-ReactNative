import React, { createContext, useCallback, useContext, useMemo } from "react";
import { Item } from "../../types/types";

interface ListContextType {
    items: Item[];
    addItem: (newList: Item) => void;
    updateItem: (id: number, updated: Partial<Item>) => void;
    deleteItem: (id: number) => void;
}

const ItemContext = createContext<ListContextType | undefined>(undefined);

export const ItemProvider = ({children}: {children: React.ReactNode}) => {
    const [items, setItems] = React.useState<Item[]>([]);

    const addItem = (newItem: Item) => {
        setItems([...items, newItem]);

        //Acá lógica para guardar la lista en MySql
        // try {
        //     await saveListToDB(newList); // lógica de guardar en la base
        //     setLists(prev => [...prev, newList]); // actualizar solo si guardó bien
        // } catch (err) {
        //     console.error("Error al guardar la lista:", err);
        //     Alert.alert("Error", "No se pudo guardar la lista. Verificá tu conexión.");
        // }
    }

    const updateItem = (id: number, updated: Partial<Item>) => {
        setItems(prevItems => prevItems.map(item => item.id === id ? {...item, ...updated} : item));
       
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

    const deleteItem = (id: number) => {
        setItems(prevLists => prevLists.filter(list => list.id !== id));

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
        items,
        addItem,
        updateItem,
        deleteItem,
      }), [items]);

    return(
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