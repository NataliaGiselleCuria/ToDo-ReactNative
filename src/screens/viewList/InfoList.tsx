import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyledText from '../../components/styledComponets/StyledText';
import { List, User } from '../../types/types';
import { useListContext } from '../../context/lists/ListContext';

import { loggedUser, otherUsers, userContacts } from '../../services/mockUsers' //user de prueba
import StyledIcon from '../../components/styledComponets/StyledIcon';
import ParticipantsList from '../../components/participants/ParticipantsList';

type Props = {
   list: List;
};

const InfoList = ({ list }: Props) => {

   const [participants, setParticipants] = useState<User[]>(list.participants || []);
   const [openInfo, setOpenInfo] = useState(false);
   const { updateList } = useListContext();

   const allUsers = [...userContacts, ...otherUsers]; //lista provisoria de usuarios
   const isLoginUser = (user: User) => user.id === loggedUser.id;

   useEffect(() => {
      updateList(list.id, { participants });
   }, [participants]);

   return (
      <>
         <View style={styles.containerInfo}>
            <View style={styles.rowInfo}>
               <StyledText>Diagrama</StyledText>
            </View>
            <View style={styles.rowInfo}>
               <StyledText>Participantes</StyledText>
               <ParticipantsList
                  participants={participants}
                  simplified={true}
                  showUserInfo={false}
                  isLoginUser={isLoginUser}
                  onSelectParticipants={(selected) => {
                     const withoutLoggedUser = selected.filter(user => user.id !== loggedUser.id);
                     setParticipants([loggedUser, ...withoutLoggedUser]);
                  }}
                  users={allUsers}
               />
            </View>
         </View>
         <TouchableOpacity onPress={() => setOpenInfo(!openInfo)} style={styles.buttonInfo}>
            <StyledText>Info</StyledText>
            <StyledIcon src={openInfo ? require('../../assets/icons-general/up.png') : require('../../assets/icons-general/down.png')}  width='sm' height='sm'/>  
         </TouchableOpacity>
         <View style={[styles.infoContainer, !openInfo && { height: 0 }]}>
            <View>
               <StyledText>Descripción</StyledText>
               <StyledText>{list.description ? list.description : ' -'}</StyledText>
            </View>
            <View>
               <StyledText>Fecha de inicio</StyledText>
               <StyledText>{list.startDate.toLocaleString('es-AR')}</StyledText>
            </View>
            <View>
               <StyledText>Fecha límite</StyledText>
               <StyledText>{list.endDate ? list.endDate.toLocaleString('es-AR') : ' -'}</StyledText>
            </View>
         </View>
      </>
   )
}

export default InfoList

const styles = StyleSheet.create({
   containerInfo: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
   },
   rowInfo: {
      width: '50%',
      alignItems: 'center',
      padding: 10,
      gap: 10,
   },
   buttonInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   buttonInfoIcon: {
      width: 24,
      height: 24,
   },
   infoContainer: {
      height: 'auto'
   }
})