import { useEffect } from "react";
import { useCreateItem } from "../../context/items/CreateItemContext";
import { useListContext } from "../../context/lists/ListContext";
import { categoryItemName, Item, List } from "../../types/types";
import { StyledModal } from "../styledComponets/StyledModal";
import ItemForm from "./ItemForm";

const EditItemModal = ({ list, itemToEdit, visible, onClose }: {
   list: List;
   itemToEdit: Item;
   visible: boolean;
   onClose: () => void;
}) => {
   const { updateList } = useListContext();
   const { updateItemData, resetItemData, itemData } = useCreateItem();

   useEffect(() => {
      if (visible) {
         updateItemData(itemToEdit);
      } else {
         resetItemData();
      }
   }, [visible]);

   const handleSubmit = () => {
      const updatedItems = list.items.map(item =>
         item.id === itemToEdit.id ? { ...itemData } : item
      );
      
      updateList(list.id, { items: updatedItems as Item[] } );
      resetItemData();
      onClose();
   };

   return (
      <StyledModal visible={visible} onSave={handleSubmit} onClose={onClose}>
         <ItemForm type="edit" list={list} item={categoryItemName[list.category]} onSubmit={handleSubmit} />
      </StyledModal>
   );
};

export default EditItemModal;