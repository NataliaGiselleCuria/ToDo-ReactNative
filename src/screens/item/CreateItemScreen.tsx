import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigationTypes';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useCreateItem } from '../../context/items/CreateItemContext';
import { useItemContext } from '../../context/items/ItemContext';
import { useDatesSchedule } from '../../hooks/useDateScheduler';
import { useDateRangeValidation } from '../../hooks/useDateRangeValidation';
import { categoryItemName, ItemState } from '../../types/types';
import { useCalendarPermission } from '../../hooks/useCalendarPermissions';
import ConfirmCancelButtons from '../../components/ConfirmCancelButtons';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import ItemForm from '../../components/Item/ItemForm';

import { loggedUser } from '../../services/mockUsers';


type CreateItemRouteProp = RouteProp<RootStackParamList, 'CreateItem'>;

type Props = {
   route: CreateItemRouteProp;
};

const CreateItemScreen: React.FC<Props> = ({ route }) => {
   const { theme, modalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const { list } = route.params;
   const { itemData, resetItemData } = useCreateItem();
   const { addItem } = useItemContext();
   const { openPermissionModal, CalendarPermissionModal } = useCalendarPermission(list);
   const navigation = useNavigation();

   const { validateStartDate, validateEndDate } = useDateRangeValidation({
      minDate: list.startDate || undefined,
      maxDate: list.endDate || undefined,
      isTime: true
   });

   const {
      scheduleStartDate, scheduleEndDate,
      startDate, endDate,
      scheduleStartTime, scheduleEndTime,
      startTime, endTime,
   } = useDatesSchedule(itemData, validateStartDate, validateEndDate)

   const handleOnClose = () => {
      navigation.goBack()
      resetItemData();
   };

   const AddNewItem = () => {
      const newItem = {
         ...itemData,
         idList: list.id,
         id: Date.now() + loggedUser.id + Math.random(),
         name: itemData.name ?? "Nuevo item",
         subcategory: itemData.subcategory ?? "",
         description: itemData.description ?? "",
         duration: itemData.duration ?? "",
         createdBy: loggedUser, // user logueado
         scheduleStartDate: scheduleStartDate || false,
         scheduleStartTime: scheduleStartTime || false,
         scheduleEndDate: scheduleEndDate || false,
         scheduleEndTime: scheduleEndTime || false,
         startTime: startTime ?? undefined,
         endTime: endTime ?? undefined,
         startDate: startDate ?? new Date(),
         endDate: endDate ?? undefined,
         assignment: itemData.assignment || undefined,
         priority: itemData.priority ?? undefined,
         state: 'No completado' as ItemState,
         note: itemData.note ?? [],
         record: []
      };

      openPermissionModal(() => {
         addItem(list.id, newItem);
         resetItemData();
         handleOnClose();
      });
   };

   return (
      <KeyboardAvoidingView
         style={{ flex: 1, backgroundColor: theme.colors.background, }}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
      >
         <StyledContainer scroll={true} style={{paddingBottom: 50}}>

            <ItemForm type="create" list={list} item={categoryItemName[list.category]} />
         
         </StyledContainer>
         <ConfirmCancelButtons
               handleSave={AddNewItem}
               handleCancel={handleOnClose}
            />
         <CalendarPermissionModal />
         {modalCount > 0 && <View style={gStyles.modalBack}></View>}
      </KeyboardAvoidingView>
   );
}

export default CreateItemScreen

const styles = StyleSheet.create({

})