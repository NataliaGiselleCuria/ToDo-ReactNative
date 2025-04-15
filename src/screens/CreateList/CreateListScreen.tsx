import { StyleSheet, Text, View, BackHandler } from 'react-native'
import React, { useState } from 'react'
import StyledContainer from '../../components/styledComponets/StyledContainer'
import CancelCreateButton from '../../components/ListComponents/CancelCreateButton'
import FormStepOne from '../../components/ListComponents/FormStepOne'
import FormStepTwo from '../../components/ListComponents/FormStepTwo'
import FormStepThree from '../../components/ListComponents/FormStepThree'
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native'
import { useCreateList } from '../../context/Lists/CreateListContext'
import StyledButton from '../../components/styledComponets/StyledButton'
import { CategoriesList, PermissionsOptions, User } from '../../types/types'
import { useListContext } from '../../context/Lists/ListContext'
import { StackNavigationProp } from '@react-navigation/stack'
import { CreateListParamList } from '../../types/navigationTypes'

import { loggedUser } from '../../services/mockUsers' //user de prueba
import ButtonBack from '../../components/ButtonBack'
import StyledText from '../../components/styledComponets/StyledText'
import CreateListButton from '../../components/ListComponents/CreateListButton'


const CreateListScreen = () => {

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

  const { updateListData, listData, resetListData } = useCreateList();
  const { addList } = useListContext();

  const [step, setStep] = useState(1);

  const handleUpdate = (data: Partial<typeof listData>) => {
    updateListData(data);
  };

  //Botón next según step
  const handleNext = () => {
    if (step === 1) {
      setStep(step + 1);
    } else if (step === 2) {
      AddNewList(); // función que finaliza y guarda la lista
      setStep(step + 1);
    } else {
      resetListData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "App" }],
        })
      );
    }
  };

  const AddNewList = () => {
    const newList = {
      ...listData,
      id: Date.now(),
      createdBy: loggedUser, // user logueado
      startDate: new Date(),
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
            }} />}
          {step === 2 && <FormStepTwo
            onChange={(data => handleUpdate(data))}
            defaultValues={{
              participants: listData.participants?.length
                ? listData.participants
                : [loggedUser],
              permissions: listData.permissions as PermissionsOptions,
            }} />}
          {step === 3 && <FormStepThree

          />}
        </View>
        <View style={styles.containerButtonNext}/>
      
      </View>
      <CreateListButton onPress={handleNext} title={step === 3 ? "CREAR LISTA" : "SIGUIENTE"} />
    </StyledContainer>
  )
}

export default CreateListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,
    padding:10
  },
  form: {
    flex: 1,
    // borderColor: 'grey',
    // borderWidth: 2,
    justifyContent:'center',
  },
  containerButtonBack: {
    height: 65,
    width: 60,
  },
  containerButtonNext:{
    height:150
  }
})