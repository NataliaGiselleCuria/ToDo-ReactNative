import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { useCreateItem } from "../../context/items/CreateItemContext";
import { useItemContext } from "../../context/items/ItemContext";
import { RootStackParamList } from "../../types/navigationTypes";
import { useTheme } from "../../context/ThemeContext";
import { globalStyles } from "../../styles/globalStyles";
import { deleteCalendarEvent } from '../../utils/calendarUtils';
import { useAlert } from "../../hooks/calendar/useAlert";
import { useCalendarIntegration } from "../../hooks/calendar/useCalendarIntegration";
import { Item } from "../../types/types";
import StyledContainer from "../../components/styledComponets/StyledContainer";
import ConfirmCancelButtons from "../../components/ConfirmCancelButtons";
import ItemForm from "../../components/Item/ItemForm";
import StyledText from "../../components/styledComponets/StyledText";
import StyledAlert from "../../components/styledComponets/StyledAlert";

type EditItemRouteProp = RouteProp<RootStackParamList, 'EditItem'>;

type Props = {
   route: EditItemRouteProp;
};

const EditItemScreen: React.FC<Props> = ({ route }) => {
   const { theme, decrementModalCount, modalCount } = useTheme();
   const { item, list } = route.params;
   const { updateItem, deleteItem } = useItemContext();
   const { updateItemData, resetItemData, itemData } = useCreateItem();
   const { alertVisible, alertMessage, alertType, showAlert, hideAlert } = useAlert();
   const { executeCalendarAction, CalendarAlerts, CalendarPermissionModal } = useCalendarIntegration();
   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
   const gStyles = globalStyles(theme);
   const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

   useEffect(() => {
      updateItemData(item);
   }, [list, item]);

   const handleSave = () => {
      if (itemData.idEventCalendar) {
         executeCalendarAction({
            data: { ...itemData as Item },
            action: 'edit',
            onSuccess: (newEventId) => {
               editItem(newEventId);
               handleCancel();
            },
         });
      } else {
         editItem()
         handleCancel();
      }
   };

   const editItem = async (newidEventCalendar?: string) => {
      const itemDataToUpdate = {
         ...itemData,
         idEventCalendar: newidEventCalendar
      }

      updateItemData(itemDataToUpdate);
      const result = await updateItem(list.id, item.id, itemDataToUpdate);

      if (!result) {
         showAlert('No se pudo guardar el ítem', 'Error');
         setTimeout(() => hideAlert(), 1500);
      }
   }

   const handleDelete = () => {
      setDeleteConfirmationVisible(true);
   };

   const confirmDelete = () => {
      if (list && itemData.id) {
         deleteItem(list.id, itemData.id);
         console.log('item idEvent: ' + itemData.idEventCalendar)
         if (itemData.idEventCalendar) {
            console.log('eliminando evento item id: ' + itemData.idEventCalendar)
            deleteCalendarEvent(itemData.idEventCalendar);
         }
         handleCancel();
      }

      setDeleteConfirmationVisible(false);
   };

   const cancelDelete = () => {
      setDeleteConfirmationVisible(false);
   };

   const handleCancel = () => {
      resetItemData();
      decrementModalCount();
      navigation.navigate('ViewList', { list: list });
   };

   return (
      <>
         <StyledContainer scroll={true}>
            <View style={[gStyles.gapContainer, styles.container]}>
               <ItemForm type="edit" list={list} item={item} />
               <TouchableOpacity style={[gStyles.deleteButton, { marginBottom: 50 }]} onPress={handleDelete}>
                  <StyledText size='sm' weight='bold' style={{ color: 'red' }}>ELIMINAR</StyledText>
               </TouchableOpacity>
            </View>
         </StyledContainer>
         <ConfirmCancelButtons
            handleSave={handleSave}
            handleCancel={handleCancel}
         />
         <CalendarPermissionModal />
         <CalendarAlerts />
         <StyledAlert
            visible={deleteConfirmationVisible}
            onClose={cancelDelete}
            title="¿Eliminar lista?"
            message="Esta acción no se puede deshacer."
            buttons={[
               { text: 'Cancelar', onPress: cancelDelete, style: { backgroundColor: 'gray' } },
               { text: 'Eliminar', onPress: confirmDelete, style: { backgroundColor: 'red' } },
            ]}
         />
         <StyledAlert
            visible={alertVisible}
            onClose={hideAlert}
            title={alertType}
            message={alertMessage}
         />
         {modalCount > 0 && <View style={gStyles.modalBack}></View>}
      </>
   );
};


export default EditItemScreen;

const styles = StyleSheet.create({
   container: {
      paddingBottom: 90
   },
})