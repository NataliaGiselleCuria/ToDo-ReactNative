import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigationTypes';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useCreateItem } from '../../context/items/CreateItemContext';
import { useItemContext } from '../../context/items/ItemContext';
import { Item, ItemState } from '../../types/types';
import ConfirmCancelButtons from '../../components/ConfirmCancelButtons';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import ItemForm from '../../components/Item/ItemForm';

import { loggedUser } from '../../services/mockUsers';
import { useListContext } from '../../context/lists/ListContext';
import StyledAlert from '../../components/styledComponets/StyledAlert';
import { useCalendarIntegration } from '../../hooks/calendar/useCalendarIntegration';
import { useAlert } from '../../hooks/calendar/useAlert';

type CreateItemRouteProp = RouteProp<RootStackParamList, 'CreateItem'>;

type Props = {
   route: CreateItemRouteProp;
};

const CreateItemScreen: React.FC<Props> = ({ route }) => {
   const { theme, modalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const navigation = useNavigation();
   const { itemData, resetItemData } = useCreateItem();
   const { getListById } = useListContext();
   const { addItem } = useItemContext();
   const { executeCalendarAction, CalendarAlerts, CalendarPermissionModal } = useCalendarIntegration();
   const { alertVisible, alertMessage, alertType, showAlert, hideAlert } = useAlert();

   const { listId } = route.params;
   const list = getListById(listId);

   const handleOnClose = () => {
      navigation.goBack()
      resetItemData();
   };

   const handleConfirm = () => {
      executeCalendarAction({
         data: { ...itemData as Item },
         action: 'add',
         onSuccess: (newEventId) => {
            AddNewItem(newEventId);
            resetItemData();
            handleOnClose();
         },
      });
   }

   const AddNewItem = async (idEventCalendar?: string) => {
      if (list) {
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

            idEventCalendar: idEventCalendar,
            assignment: itemData.assignment || undefined,
            priority: itemData.priority ?? undefined,
            state: 'No completado' as ItemState,
            note: itemData.note ?? [],
            record: []
         };

         const result = await addItem(list.id, newItem);

          if (!result) {
            showAlert('No se pudo agregar el ítem', 'Error');
            setTimeout(() => hideAlert(), 1500);
         }

      } else {
         showAlert('Datos inválidos', 'Error');
         setTimeout(() => hideAlert(), 1500);
      }
   };

   if (!list) return  // Crear pantalla de elemento no encontrado "Lista no encontrada"

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
         <StyledAlert
            visible={alertVisible}
            onClose={hideAlert}
            title={alertType}
            message={alertMessage}
         />
         {modalCount > 0 && <View style={gStyles.modalBack}></View>}
      </KeyboardAvoidingView>
   );
}

export default CreateItemScreen

const styles = StyleSheet.create({

})