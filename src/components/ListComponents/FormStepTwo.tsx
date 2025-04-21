import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { PermissionsOptions, User } from '../../types/types';
import StyledText from '../styledComponets/StyledText'

import { loggedUser, otherUsers, userContacts } from '../../services/mockUsers' //user de prueba
import ParticipantsList from '../participants/ParticipantsList';
import OptionsListLayout from '../OptionsListLayout';

type StepTwoProps = {
  onChange: (data: { participants: User[]; permissions: PermissionsOptions }) => void;
  defaultValues: {
    participants: User[];
    permissions: PermissionsOptions;
  };
};

const FormStepTwo: React.FC<StepTwoProps> = ({ onChange, defaultValues }) => {
  const { theme } = useTheme();
  const [participants, setParticipants] = useState<User[]>(defaultValues.participants || []);
  const [permissions, setPermissions] = useState<PermissionsOptions>(defaultValues.permissions || PermissionsOptions.onlyMe);

  const deleteParticipant = (id: number) => {
    setParticipants(prev => prev.filter(participant => participant.id !== id))
  }

  useEffect(() => {
    onChange({ participants, permissions });
  }, [participants, permissions]);

  const allUsers = [...userContacts, ...otherUsers]; //lista provisoria de usuarios
  const isLoginUser = (user: User) => user.id === loggedUser.id;

  return (
    <View style={{gap:15}}>
      <View >
        <StyledText>Participantes:</StyledText>
        <View style={styles.containerPartisipants}>
          <ParticipantsList
            participants={participants}
            onDelete={deleteParticipant}
            isLoginUser={isLoginUser}
            onSelectParticipants={(selected) => {
              const withoutLoggedUser = selected.filter(user => user.id !== loggedUser.id);
              setParticipants([loggedUser, ...withoutLoggedUser]);
            }}
            users={allUsers}
          />
        </View>
      </View>
      <View>
        <StyledText>Privacidad</StyledText>
        <View>
          <OptionsListLayout selectedPermissions={permissions} onSelectPermissions={setPermissions} />
        </View>
      </View>
    </View>
  )
}

export default FormStepTwo

const styles = StyleSheet.create({
  containerPartisipants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },


});
