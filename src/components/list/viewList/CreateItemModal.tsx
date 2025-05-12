import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { Item, ItemState, List } from '../../../types/types';
import { useTheme } from '../../../context/ThemeContext';
import { globalStyles } from '../../../styles/globalStyles';
import { useListContext } from '../../../context/lists/ListContext';
import { useDateRangeValidation } from '../../../hooks/useDateRangeValidation';
import { useCreateItem } from '../../../context/items/CreateItemContext';
import { loggedUser } from '../../../services/mockUsers';
import { StyledModal } from '../../styledComponets/StyledModal';
import { useDatesSchedule } from '../../../hooks/useDateScheduler';
import ItemForm from '../../Item/ItemForm';

type Props = {
   type: 'create' | 'edit'
   list: List;
   item: string;
   visible: boolean;
   onClose: () => void;
};

const CreateItemModal = ({ type, list, item, visible, onClose }: Props) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const { itemData, resetItemData } = useCreateItem();
   const { updateList } = useListContext();

   const { validateStartDate, validateEndDate } = useDateRangeValidation({
      minDate: list.startDate || undefined,
      maxDate: list.endDate || undefined,
      isTime: true
   });

   const {
      startDate, endDate, 
      scheduleStartDate, scheduleEndDate,
   } = useDatesSchedule(itemData, validateStartDate, validateEndDate)

   useEffect(() => {
      if (!visible) {
         resetItemData();
      }
   }, [visible]);

   const AddNewItem = () => {
      const newItem = {
         ...itemData,
         idList: list.id,
         id: Date.now(),
         name: itemData.name ?? "Nuevo item",
         subcategory: itemData.subcategory ?? "",
         description: itemData.description ?? "",
         duration: itemData.duration ?? "",
         createdBy: loggedUser, // user logueado
         scheduleStartDate: scheduleStartDate || false,
         scheduleEndDate: scheduleEndDate || false,
         startDate: startDate ?? new Date(),
         endDate: endDate ?? undefined,
         assignment: itemData.assignment || undefined,
         priority: itemData.priority ?? undefined,
         state: 'No completado' as ItemState,
         note: itemData.note ?? [],
         record: []
      };

      const updatedItems = [...list.items, newItem];

      updateList(list.id, { items: updatedItems as Item[] });
      resetItemData();
      onClose();
   };

   return (
      <StyledModal visible={visible} onSave={AddNewItem} onClose={onClose}>
          <ItemForm type="create" list={list} item={item} onSubmit={AddNewItem} />
      </StyledModal>
   );
}

export default CreateItemModal

const styles = StyleSheet.create({
 
})