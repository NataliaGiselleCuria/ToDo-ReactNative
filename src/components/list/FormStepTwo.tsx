import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import { PermissionsOptions, User } from '../../types/types';
import StyledText from '../styledComponets/StyledText'

import { loggedUser, otherUsers, userContacts } from '../../services/mockUsers' //user de prueba
import ParticipantsList from '../participants/ParticipantsList';
import OptionsListLayout from '../OptionsListLayout';
import { globalStyles } from '../../styles/globalStyles';

type StepTwoProps = {
  onChange: (data: { participants: User[]; permissions: PermissionsOptions; allowedUsers: User[] }) => void;
  defaultValues: {
    participants: User[];
    permissions: PermissionsOptions;
    allowedUsers: User[];
  };
};

const FormStepTwo: React.FC<StepTwoProps> = ({ onChange, defaultValues }) => {
  const { theme } = useTheme();
  const gStyles = globalStyles(theme);

  const [participants, setParticipants] = useState<User[]>(defaultValues.participants || []);
  const [permissions, setPermissions] = useState<PermissionsOptions>(defaultValues.permissions || PermissionsOptions.onlyMe);
  const [allowedUsers, setAllowedUsers] = useState<User[]>(defaultValues.allowedUsers || []);

  const deleteParticipant = (id: number) => {
    setParticipants(prev => prev.filter(participant => participant.id !== id))
  }

  useEffect(() => {
    if (permissions === PermissionsOptions.onlyMe) {
      setAllowedUsers([loggedUser]);
    } else if (permissions === PermissionsOptions.all) {
      setAllowedUsers([participants[0], ...participants.slice(1)]);
    }
  }, [permissions, participants]);

  const deleteAllowedUser = (id: number) => {
    setAllowedUsers(prev => prev.filter(allowedUsers => allowedUsers.id !== id))
  }

  useEffect(() => {
    onChange({ participants, permissions, allowedUsers });
  }, [participants, permissions, allowedUsers]);

  const allUsers = [...userContacts, ...otherUsers]; //lista provisoria de usuarios
  const isLoginUser = (user: User) => user.id === loggedUser.id;

  return (
    <View style={[gStyles.gapContainer]}>
            
      <View style={gStyles.itemForm}>
        <StyledText>Participantes</StyledText>
        <View style={[
          gStyles.rowWrap, gStyles.shadow, styles.containerParticipants,
          { backgroundColor: theme.colors.background, borderColor: theme.colors.line }
        ]}>
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
      <View style={[gStyles.itemForm,{paddingBottom:40}]}>
        <StyledText>Permisos de edición</StyledText>
        <OptionsListLayout
          selectedPermissions={permissions}
          onSelectPermissions={setPermissions}
          styles={{ marginBottom: 20 }}
        />
        <ParticipantsList
          simplified={true}
          showUserInfo={false}
          participants={allowedUsers}
          isLoginUser={isLoginUser}
          size='sm'
          users={participants}
          {...(permissions === 'algunos' && {
            onDelete: deleteAllowedUser,
            onSelectParticipants: (selected) => {
              const withoutLoggedUser = selected.filter(user => user.id !== loggedUser.id);
              setAllowedUsers([loggedUser, ...withoutLoggedUser]);
            }
          })}
        />
      </View>
      </View>
  )
}

export default FormStepTwo

const styles = StyleSheet.create({
  containerParticipants: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal:5,
  }
});
