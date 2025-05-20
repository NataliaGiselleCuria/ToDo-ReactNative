import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import type { RootStackParamList } from '../../types/navigationTypes';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { CalendarData, List } from '../../types/types';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useCancelToHome } from '../../hooks/useCancelToHome';
import StyledText from '../../components/styledComponets/StyledText';
import FormStepOne from '../../components/list/FormStepOne';
import FormStepTwo from '../../components/list/FormStepTwo';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import ConfirmCancelButtons from '../../components/ConfirmCancelButtons';
import { useCalendarPermission } from '../../hooks/useCalendarPermissions';
import StyledAlert from '../../components/styledComponets/StyledAlert';
import { deleteCalendarEvent } from '../../utils/calendarUtils';

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
   const { openPermissionModal, CalendarPermissionModal } = useCalendarPermission();
   const [alertVisible, setAlertVisible] = React.useState(false);
   const [alertMessage, setAlertMessage] = useState('');
   const [alertType, setAlertType] = useState<'Éxito' | 'Error'>('Éxito');

   const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

   const { listId } = route.params;
   const list = getListById(listId);
   const [formData, setFormData] = useState(list);

   const handleUpdate = (data: Partial<List>) => {
      setFormData(prev => prev ? ({ ...prev, ...data }) : data as List);
   };

   const handleSave = () => {
      if (formData) {

         const dataCalendar: CalendarData = {
            idEventCalendar: formData.idEventCalendar,
            name: formData.name,
            description: formData.description,
            startDate: formData.startDate,
            startTime: formData.startTime,
            endDate: formData.endDate,
            endTime: formData.endTime,
         };

         openPermissionModal(
            { ...dataCalendar },
            (success, newEventId) => {
               editList(newEventId)

               if (success) {
                  setAlertMessage('La lista fue editada con éxito.');
                  setAlertType('Éxito');
                  setAlertVisible(true);

               } else {
                  setAlertMessage('La lista fue editada, pero no se pudo editar el evento en el calendario.');
                  setAlertType('Error');
                  setAlertVisible(true);
               }

               setTimeout(() => {
                  handleCancel();
               }, 1500);
            },
            'edit'
         );
      }
   };

   const editList = (newidEventCalendar?: string) => {
      if (formData) {
         const formDataToUpdate = {
            ...formData,
            idEventCalendar: newidEventCalendar
         }

         setFormData(formDataToUpdate);
         updateList(formData.id, formDataToUpdate);

      } else {
         setAlertMessage('No se pudo actualizar la lista');
         setAlertType('Error');
         setAlertVisible(true);
      }
   }

   const handleCancel = () => {
      navigation.goBack();
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
         <StyledAlert
            visible={alertVisible}
            onClose={() => setAlertVisible(!alertVisible)}
            title={alertType}
            message={alertMessage}
            buttons={[{ text: 'Ok', onPress: () => setAlertVisible(!alertVisible) }]}
         />
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

