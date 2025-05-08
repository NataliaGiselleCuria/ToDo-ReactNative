import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import { Item, ItemState, List, Priority } from '../../types/types';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useListContext } from '../../context/lists/ListContext';
import { useDateRangeValidation } from '../../hooks/useDateRangeValidation';
import { useCreateItem } from '../../context/items/CreateItemContext';
import { loggedUser } from '../../services/mockUsers';
import StyledText from '../styledComponets/StyledText';
import StyledInput from '../styledComponets/StyledInput';
import DateSelector from '../DateSelector';
import ParticipantsList from '../participants/ParticipantsList';
import OptionsListLayout from '../OptionsListLayout';
import { StyledModal } from '../styledComponets/StyledModal';
import { useDatesSchedule } from '../../hooks/useDateScheduler';

type Props = {
   list: List;
   item: string;
   visible: boolean;
   onClose: () => void;
};

const CreateItemModal = ({ list, item, visible, onClose }: Props) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const { updateItemData, itemData, resetItemData } = useCreateItem();
   const { updateList } = useListContext();

   const { validateStartDate, validateEndDate } = useDateRangeValidation({
      minDate: list.startDate || undefined,
      maxDate: list.endDate || undefined,
      isTime: true
   });

   const {
      startDate, startTime, endDate, endTime,
      scheduleStartDate, scheduleStartTime, scheduleEndDate, scheduleEndTime, setScheduleEndTime,
      handleDateChange
   } = useDatesSchedule(itemData, validateStartDate, validateEndDate)

   const handleStartDateChange = (date: Date | undefined) =>
      handleDateChange('startDate', date, validateStartDate);

   const handleStartTimeChange = (date: Date | undefined) =>
      handleDateChange('startTime', date, validateEndDate);

   const handleEndDateChange = (date: Date | undefined) =>
      handleDateChange('endDate', date, validateEndDate);

   const handleEndTimeChange = (date: Date | undefined) =>
      handleDateChange('endTime', date, validateEndDate);

   useEffect(() => {
      if (!visible) {
         resetItemData();
      }
   }, [visible]);

   const handleChange = (field: keyof typeof itemData, value: any) => {
      updateItemData({ [field]: value });
      !scheduleEndDate && setScheduleEndTime(false);
   };

   const AddNewItem = () => {
      const newItem = {
         ...itemData,
         idList: list.id,
         id: Date.now(),
         name: itemData.name || "Nuevo item",
         subcategory: itemData.subcategory || "",
         description: itemData.description || "",
         duration: itemData.duration || "",
         createdBy: loggedUser, // user logueado
         scheduleStartDate: scheduleStartDate || false,
         scheduleEndDate: scheduleEndDate || false,
         startDate: startDate ?? new Date(),
         endDate: endDate ?? undefined,
         assignment: itemData.assignment || undefined,
         priority: itemData.priority || undefined,
         state: "no completado" as ItemState,
         note: itemData.note ? itemData.note : [],
         image: itemData.image || "",
         record: []
      };

      const updatedItems = [...list.items, newItem];

      updateList(list.id, { items: updatedItems as Item[] });
      resetItemData();
      onClose();
   };

   return (
      <StyledModal visible={visible} onSave={AddNewItem} onClose={onClose}>
         <View style={[gStyles.gapContainer, styles.container]}>
            <StyledText size="xlg">CREAR {item.toLocaleUpperCase()}</StyledText>
            <View style={gStyles.itemForm}>
               <StyledText>Nombre</StyledText>
               <StyledInput value={itemData.name || ""} onChangeText={text => handleChange("name", text)} placeholder={`Nuevo ${item}`} />
            </View>
            <View style={gStyles.itemForm}>
               <StyledText>Subcategoría</StyledText>
               <View>
                  {list.category === 'Otras' ? (
                     <StyledInput
                        value={itemData.subcategory || ""}
                        onChangeText={(text) => handleChange("subcategory", text)}
                        placeholder="Escribí una subcategoría (opcional)"
                     />
                  ) : (
                     <OptionsListLayout
                        selectedCategory={list.category}
                        selectedSubcategory={itemData.subcategory}
                        onSelectSubcategory={(subcategory) => handleChange("subcategory", subcategory)}
                     />
                  )}
               </View>
            </View>
            <View style={gStyles.itemForm}>
               <StyledText>Descripción</StyledText>
               <StyledInput value={itemData.description || ""} onChangeText={text => handleChange("description", text)} multiline />
            </View>
            <View style={gStyles.itemForm}>
               <View style={gStyles.rowBetween}>
                  <DateSelector
                     mode="date"
                     type='startDate'
                     label="Fecha inicio"
                     value={startDate}
                     onChange={(handleStartDateChange)}
                     selectedByDefault={scheduleStartDate}
                     defaultValueIfDisabled={undefined}
                  />
                  <DateSelector
                     mode="time"
                     type='startTime'
                     label="Hora"
                     value={startTime}
                     onChange={handleStartTimeChange}
                     selectedByDefault={scheduleStartTime}
                     defaultValueIfDisabled={undefined}
                  />
               </View>
            </View>
            <View style={gStyles.itemForm}>
               <View style={gStyles.rowBetween}>
                  <DateSelector
                     mode="date"
                     type='endDate'
                     label="Fecha límite"
                     value={endDate}
                     onChange={handleEndDateChange}
                     selectedByDefault={scheduleEndDate}
                     defaultValueIfDisabled={undefined}
                  />
                  <DateSelector
                     disabled={!scheduleEndDate}
                     mode="time"
                     type='endTime'
                     label="Hora"
                     value={endTime}
                     onChange={handleEndTimeChange}
                     selectedByDefault={scheduleEndTime}
                     defaultValueIfDisabled={undefined}
                  />
               </View>
            </View>
            <View style={gStyles.itemForm}>
               <StyledText>Prioridad</StyledText>
               <OptionsListLayout
                  selectedPriority={itemData.priority}
                  onSelectPriority={(priority) => handleChange("priority", priority)}
               />
               
            </View>
            <View>
               <StyledText style={{ marginBottom: 20 }}>Usuarios asignados:</StyledText>
               <ParticipantsList
                  simplified={true}
                  showUserInfo={false}
                  size='sm'
                  participants={itemData.assignment}
                  users={list.participants}
                  onSelectParticipants={(selected) => {
                     handleChange("assignment", selected);
                  }}
               />
            </View>
         </View>
      </StyledModal>
   );
}

export default CreateItemModal

const styles = StyleSheet.create({
   container: {
      paddingBottom: 90
   },

})