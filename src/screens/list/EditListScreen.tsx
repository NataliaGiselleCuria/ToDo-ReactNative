import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import type { RootStackParamList } from '../../types/navigationTypes';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { List } from '../../types/types';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useCancelToHome } from '../../hooks/useCancelToHome';
import { deleteCalendarEvent } from '../../utils/calendarUtils';
import { useCalendarIntegration } from '../../hooks/calendar/useCalendarIntegration';
import { useAlert } from '../../hooks/calendar/useAlert';
import StyledText from '../../components/styledComponets/StyledText';
import FormStepOne from '../../components/list/FormStepOne';
import FormStepTwo from '../../components/list/FormStepTwo';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import ConfirmCancelButtons from '../../components/ConfirmCancelButtons';
import StyledAlert from '../../components/styledComponets/StyledAlert';
import usePreventGoBack from '../../hooks/usePreventGoBack';

type EditListRouteProp = RouteProp<RootStackParamList, 'EditList'>;

type Props = {
   route: EditListRouteProp;
};

const EditListScreen: React.FC<Props> = ({ route }) => {
   const { theme, decrementModalCount, modalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const navigation = useNavigation();
   const cancelToHome = useCancelToHome();

   const { updateList, deleteList, getListById } = useListContext();
   const { alertVisible, alertMessage, alertType, showAlert, hideAlert } = useAlert();
   const { executeCalendarAction, CalendarAlerts, CalendarPermissionModal } = useCalendarIntegration();
   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

   const { listId } = route.params;
   const list = getListById(listId);
   const [formData, setFormData] = useState(list);

    usePreventGoBack();

   const handleUpdate = (data: Partial<List>) => {
      setFormData(prev => prev ? ({ ...prev, ...data }) : data as List);
   };

   const handleSave = () => {
      if (formData) {
         if (formData.idEventCalendar) {
            executeCalendarAction({
               data: { ...formData as List },
               action: 'edit',
               onSuccess: (newEventId) => {
                  editList(newEventId);
                  handleCancel();
               },
            });
         } else {
            editList()
            handleCancel();
         }
      }
   };

   const editList = async (newidEventCalendar?: string) => {
      if (formData) {
         const formDataToUpdate = {
            ...formData,
            idEventCalendar: newidEventCalendar
         };

         setFormData(formDataToUpdate);
         const result = await updateList(formData.id, formDataToUpdate);

         if (!result) {
            showAlert('No se pudo actualizar la lista', 'Error');
            setTimeout(() => hideAlert(), 1500);
         }

      } else {
         showAlert('Datos inválidos', 'Error');
         setTimeout(() => hideAlert(), 1500);
      }
   };

   const handleDelete = () => {
      setDeleteConfirmationVisible(true);
   };

   const confirmDelete = () => {
      if (formData) {
         deleteList(formData.id);
         if (formData.idEventCalendar) {
            deleteCalendarEvent(formData.idEventCalendar);
         }

         decrementModalCount();
         cancelToHome();
      }
      setDeleteConfirmationVisible(false);
   };

   const cancelDelete = () => {
      setDeleteConfirmationVisible(false);
   };

   const handleCancel = () => {
      navigation.goBack();
   };

   if (!formData) {
      // Crear pantalla de elemento no encontrado "Lista no encontrada"
      return null;
   }

   return (
      <>
         <StyledContainer scroll={true}>
            <View style={[gStyles.gapContainer, styles.container]}>
               <StyledText size='xlg'>EDITAR LISTA</StyledText>
               <FormStepOne
                  defaultValues={formData}
                  onChange={data => handleUpdate(data)}
               />
               <FormStepTwo
                  defaultValues={formData}
                  onChange={data => handleUpdate(data)}
               />
               <TouchableOpacity style={gStyles.deleteButton} onPress={handleDelete}>
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

export default EditListScreen

const styles = StyleSheet.create({
   container: {
      paddingTop: 20,
      paddingBottom: 140
   },
   containerChildren: {
      flex: 1,
      flexGrow: 1,
      marginBottom: 37,

   },

})

