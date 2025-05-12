import React, { useState } from 'react'
import { StyleSheet, View, BackHandler, KeyboardAvoidingView, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { useCalendarPermission } from '../../hooks/useCalendarPermissions'
import { useCreateList } from '../../context/lists/CreateListContext'
import { useListContext } from '../../context/lists/ListContext'
import { useTheme } from '../../context/ThemeContext';
import { loggedUser } from '../../services/mockUsers' //user de prueba
import { globalStyles } from '../../styles/globalStyles'
import { CategoriesList, List, PermissionsOptions } from '../../types/types'
import { ScrollView } from 'react-native-gesture-handler'
import { useCancelToHome } from '../../hooks/useCancelToHome';
import LinearGradient from 'react-native-linear-gradient';
import CancelCreateButton from '../../components/list/CancelCreateButton'
import ButtonBack from '../../components/ButtonBack'
import StyledText from '../../components/styledComponets/StyledText'
import CreateListButton from '../../components/list/CreateListButton'
import FormStepOne from '../../components/list/FormStepOne'
import FormStepTwo from '../../components/list/FormStepTwo'

const CreateListScreen = () => {

   const { theme, modalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const cancelToHome = useCancelToHome();
   const { updateListData, listData, resetListData } = useCreateList();
   const { addList } = useListContext();
   const [step, setStep] = useState(1);
   const { openPermissionModal, CalendarPermissionModal } = useCalendarPermission(listData);

   //Evitar que se pueda volver atrás con los gestos del mobil -> forzar a usar el botón 'cancelar'
   useFocusEffect(
      React.useCallback(() => {
         const onBackPress = () => {
            return true;
         };
         const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
         return () => subscription.remove();
      }, [])
   );

   const getDefaultValuesStepOne = (listData: Partial<List>) => ({
      name: listData.name ?? "",
      description: listData.description ?? "",
      category: listData.category ?? CategoriesList.others,
      scheduleStartDate: listData.scheduleStartDate ?? false,
      scheduleStartTime: listData.scheduleStartTime ?? false,
      startDate: listData.startDate ?? undefined,
      startTime: listData.startTime ?? undefined,
      scheduleEndDate: listData.scheduleEndDate ?? false,
      scheduleEndTime: listData.scheduleEndTime ?? false,
      endDate: listData.endDate ?? undefined,
      endTime: listData.endTime ?? undefined,
   });

   const getDefaultValuesStepTwo = (listData: Partial<List>) => ({
      participants: listData.participants ?? [loggedUser],
      permissions: listData.permissions ?? PermissionsOptions.onlyMe,
      allowedUsers: listData.allowedUsers ?? [loggedUser],
   })

   const handleUpdate = (data: Partial<typeof listData>) => {
      updateListData(data);
   };

   //Botón next según step
   const handleNext = () => {
      if (step === 1) {
         setStep(step + 1);
      } else {
         listData.startDate === undefined && (listData.startDate = new Date());

         openPermissionModal(() => {
            AddNewList();
            resetListData();
            cancelToHome();
         });
      }
   };

   const AddNewList = () => { 

      const newList = {
         ...listData,
         id: Date.now(),
         createdBy: loggedUser, // user logueado
         items: [],
         progress: 0

      };

      updateListData(newList);
      addList(newList as any);
   };

   return (
      <KeyboardAvoidingView
         style={{ flex: 1, backgroundColor: theme.colors.background, paddingTop: 25 }}
         behavior={Platform.OS === "ios" ? "padding" : "height"}
         keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -200}
      >
         <CancelCreateButton />
         <LinearGradient
            colors={[theme.colors.background, theme.colors.background, theme.colors.background, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.gradientTop}
         >
            <View style={styles.containerButtonBack}>
               {step > 1 &&
                  <ButtonBack onPress={() => setStep(step - 1)} />
               }
            </View>
            <StyledText size='xlg'>NUEVA LISTA</StyledText>
         </LinearGradient>
         <ScrollView style={[{ flex: 1, backgroundColor: theme.colors.background, overflow: 'hidden' }]}>
            <View style={styles.containerForm}>
               {step === 1 && (
                  <FormStepOne
                     onChange={(data) => handleUpdate(data)}
                     defaultValues={getDefaultValuesStepOne(listData)}
                  />
               )}
               {step === 2 && (
                  <FormStepTwo
                     onChange={(data) => handleUpdate(data)}
                     defaultValues={getDefaultValuesStepTwo(listData)}
                  />
               )}
            </View>
         </ScrollView>
         <LinearGradient
            colors={[theme.colors.background, 'transparent']}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 0, y: 0 }}
            style={[styles.containerButtonCreate]}
         >
            <CreateListButton onPress={handleNext} title={step === 2 ? "CREAR LISTA" : "SIGUIENTE"} />
         </LinearGradient>
         <CalendarPermissionModal />
         {modalCount > 0 && <View style={gStyles.modalBack}></View>}
      </KeyboardAvoidingView>
   )
}

export default CreateListScreen

const styles = StyleSheet.create({
   containerButtonBack: {
      height: 30,
   },
   containerNext: {
      height: 150,
   },
   containerForm: {
      paddingTop: 85,
      paddingBottom: 140,
      paddingHorizontal: 20,
      gap: 10,
      overflow: 'visible',
      flexGrow: 1,
   },
   containerButtonCreate: {
      position: 'absolute',
      bottom: 0,
      zIndex: 5,
      height: '20%',
      width: '110%',
   },
   gradientTop: {
      paddingTop: 10, 
      paddingLeft: 20,
      height: 120,
      width: '100%',
      position: 'absolute',
      top: 15,
      zIndex: 1,
   }

})