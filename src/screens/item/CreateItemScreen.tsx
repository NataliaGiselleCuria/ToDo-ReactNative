import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigationTypes';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useCreateItem } from '../../context/items/CreateItemContext';
import { useItemContext } from '../../context/items/ItemContext';
import { categoryItemName, Item, ItemState } from '../../types/types';
import { useCalendarPermission } from '../../hooks/useCalendarPermissions';
import ConfirmCancelButtons from '../../components/ConfirmCancelButtons';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import ItemForm from '../../components/Item/ItemForm';

import { loggedUser } from '../../services/mockUsers';
import { useListContext } from '../../context/lists/ListContext';

type CreateItemRouteProp = RouteProp<RootStackParamList, 'CreateItem'>;

type Props = {
   route: CreateItemRouteProp;
};

const CreateItemScreen: React.FC<Props> = ({ route }) => {
   const { theme, modalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const { updateItemData, itemData, resetItemData } = useCreateItem();
   const { getListById } = useListContext();
   const { addItem } = useItemContext();
   const { openPermissionModal, CalendarPermissionModal } = useCalendarPermission();
   const navigation = useNavigation();

   const { listId } = route.params;
   const list = getListById(listId);

   if (!list) {
      return
   };

   const handleOnClose = () => {
      navigation.goBack()
      resetItemData();
   };

   const handleConfirm = () => {
      openPermissionModal(
         { ...itemData },
         (newEventId) => {
            AddNewItem(newEventId);
            resetItemData();
            handleOnClose();
         },
         'add'
      );
   }

   const AddNewItem = (calendarEventId?: string) => {

      const newItem = {
         ...itemData,
         idList: list.id,
         id: Date.now() + loggedUser.id + Math.random(),
         name: itemData.name ?? "Nuevo item",
         subcategory: itemData.subcategory ?? "",
         description: itemData.description ?? "",
         duration: itemData.duration ?? "",
         createdBy: loggedUser, // user logueado

         scheduleStartDate: itemData.scheduleStartDate || false,
         scheduleStartTime: itemData.scheduleStartTime || false,
         startDate: itemData.startDate ?? new Date(),
         startTime: itemData.startTime ?? undefined,

         scheduleEndDate: itemData.scheduleEndDate || false,
         scheduleEndTime: itemData.scheduleEndTime || false,
         endDate: itemData.endDate ?? undefined,
         endTime: itemData.endTime ?? undefined,

         calendarEventId: calendarEventId,
         assignment: itemData.assignment || undefined,
         priority: itemData.priority ?? undefined,
         state: 'No completado' as ItemState,
         note: itemData.note ?? [],
         record: []
      };

      addItem(list.id, newItem);
   };

   return (
      <KeyboardAvoidingView
         style={{ flex: 1, backgroundColor: theme.colors.background, }}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
      >
         <StyledContainer scroll={true} style={{ paddingBottom: 90 }}>

            <ItemForm type="create" list={list} item={itemData as Item} />

         </StyledContainer>
         <ConfirmCancelButtons
            handleSave={handleConfirm}
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