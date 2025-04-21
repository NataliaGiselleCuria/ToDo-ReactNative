import { StyleSheet, View, BackHandler } from 'react-native'
import React, { useState } from 'react'
import StyledContainer from '../../components/styledComponets/StyledContainer'
import CancelCreateButton from '../../components/listComponents/CancelCreateButton'
import ButtonBack from '../../components/ButtonBack'
import StyledText from '../../components/styledComponets/StyledText'
import CreateListButton from '../../components/listComponents/CreateListButton'
import FormStepOne from '../../components/listComponents/FormStepOne'
import FormStepTwo from '../../components/listComponents/FormStepTwo'
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCreateList } from '../../context/lists/CreateListContext'
import { CategoriesList, PermissionsOptions } from '../../types/types'
import { useListContext } from '../../context/lists/ListContext'
import { StackNavigationProp } from '@react-navigation/stack'
import { CreateListParamList } from '../../types/navigationTypes'

import { loggedUser } from '../../services/mockUsers' //user de prueba
import { useCalendarPermission } from '../../hooks/useCalendarPermissions'


const CreateListScreen = () => {
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

  const handleUpdate = (data: Partial<typeof listData>) => {
    updateListData(data);
  };

  //Botón next según step
  const handleNext = () => {
    if (step === 1) {
      setStep(step + 1);
    } else {
      openPermissionModal(() => {
        AddNewList();
        resetListData();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "App" }],
          })
        );
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

  type NavigationProp = StackNavigationProp<CreateListParamList, 'CreateList'>;
  const navigation = useNavigation<NavigationProp>();

  return (
    <StyledContainer >
      <CancelCreateButton />
      <View style={styles.container}>
        <View style={styles.containerButtonBack}>
          {step > 1 &&
            <ButtonBack onPress={() => setStep(step - 1)} />
          }
        </View>

        <StyledText size='xlg'>NUEVA</StyledText>
        <StyledText size='xlg'>  LISTA</StyledText>
        {/* formulario */}
        <View style={styles.form}>
          {step === 1 && <FormStepOne
            onChange={(data => handleUpdate(data))}
            defaultValues={{
              name: listData.name ? listData.name : "",
              description: listData.description ? listData.description : "",
              category: listData.category ? listData.category : CategoriesList.others,
              scheduleStartDate: listData.scheduleStartDate ? listData.scheduleStartDate : false,
              startDate: listData.startDate ? listData.startDate : new Date(),
              endDate: listData.endDate ? listData.endDate : undefined,
              scheduleEndDate: listData.scheduleEndDate ? listData.scheduleEndDate : false,
            }} />}
          {step === 2 && <FormStepTwo
            onChange={(data => handleUpdate(data))}
            defaultValues={{
              participants: listData.participants?.length
                ? listData.participants
                : [loggedUser],
              permissions: listData.permissions as PermissionsOptions,
            }} />}
        </View>
        <View style={styles.containerButtonNext} />

      </View>
      <CreateListButton onPress={handleNext} title={step === 3 ? "CREAR LISTA" : "SIGUIENTE"} />

      <CalendarPermissionModal/>

    </StyledContainer>
  )
}

export default CreateListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
    padding: 10
  },
  form: {
    flex: 1,
    // borderColor: 'grey',
    // borderWidth: 2,
    justifyContent: 'center',
  },
  containerButtonBack: {
    height: 65,
    width: 60,
  },
  containerButtonNext: {
    height: 150
  }
})