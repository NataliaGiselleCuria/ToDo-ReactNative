import React from 'react';
import { Text, View } from 'react-native';
import StyledContainer from '../styledComponets/StyledContainer';
import { useCreateList } from '../../context/Lists/CreateListContext';
import UsersPreview from '../UsersPreview';


type StepOneProps = {

};

export default function FormStepThree() {
  const { listData } = useCreateList();

  return (
    <View>
      <Text></Text>
      <Text>Resumen:</Text>
      <Text>Nombre: {listData.name}</Text>
      <Text>Descripción: {listData.description}</Text>
      <Text>Categoría: {listData.category}</Text>

      <View>
        <Text>participantes:</Text>
        {listData.participants?.map((participant) => (
          <View key={participant.id}>
            <UsersPreview key={participant.id} user={participant} />
          </View>
        ))}
      </View>

      <Text>Permisos: {listData.permissions}</Text>
      <Text>Creado por: {listData.createdBy?.name}</Text>

    </View>
  );
}