import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import type { RootStackParamList } from '../../types/navigationTypes';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { List } from '../../types/types';
import { useListContext } from '../../context/lists/ListContext';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { useCancelToHome } from '../../hooks/useCancelToHome';
import StyledText from '../../components/styledComponets/StyledText';
import FormStepOne from '../../components/list/FormStepOne';
import FormStepTwo from '../../components/list/FormStepTwo';
import StyledContainer from '../../components/styledComponets/StyledContainer';
import ConfirmCancelButtons from '../../components/ConfirmCancelButtons';

type EditListRouteProp = RouteProp<RootStackParamList, 'EditList'>;

type Props = {
   route: EditListRouteProp;
};

const EditListScreen: React.FC<Props> = ({ route }) => {
   const { theme, decrementModalCount, modalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const { list } = route.params;
   const { updateList, deleteList } = useListContext();
   const [formData, setFormData] = useState(list);
   const navigation = useNavigation();
   const cancelToHome = useCancelToHome();

   const handleUpdate = (data: Partial<List>) => {
      setFormData(prev => ({ ...prev, ...data }));
   };

   const handleSave = () => {
      updateList(formData.id, formData);
      handleCancel()
   };

   const handleCancel = () => {
      decrementModalCount();
      navigation.goBack();
   };

   const handleDelete = () => {
      Alert.alert(
         '¿Eliminar lista?',
         'Esta acción no se puede deshacer.',
         [
            {
               text: 'Cancelar',
               style: 'cancel',
            },
            {
               text: 'Eliminar',
               style: 'destructive',
               onPress: () => {
                  deleteList(formData.id);
                  decrementModalCount();
                  cancelToHome();
               },
            },
         ],
         { cancelable: true }
      );
   };

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
          {modalCount > 0 && <View style={gStyles.modalBack}></View>}
      </>
   );
};

export default EditListScreen

const styles = StyleSheet.create({
   container: {
      paddingBottom: 120
   },
   containerChildren: {
      flex: 1,
      flexGrow: 1,
      marginBottom: 37,

   },

})

