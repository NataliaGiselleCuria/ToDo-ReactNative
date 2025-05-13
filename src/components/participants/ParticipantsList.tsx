import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { User } from '../../types/types';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import StyledIcon from '../styledComponets/StyledIcon';
import AddParticipantModal from './AddParticipantModal';
import UsersPreview from './UsersPreview';

type Props = {
   participants: User[] | undefined;
   onDelete?: (id: number) => void;
   isLoginUser?: (user: User) => boolean;
   onSelectParticipants?: (selected: User[]) => void;
   users?: User[];
   simplified?: boolean;
   size?: 'sm' | 'normal';
   showUserInfo?: boolean;
   delimit?: boolean
};

const ParticipantsList: React.FC<Props> = ({
   participants,
   onDelete,
   onSelectParticipants,
   users = [],
   isLoginUser = () => false,
   simplified = false,
   size = 'normal',
   showUserInfo = true,
   delimit = false
}) => {
   const { theme, incrementModalCount, decrementModalCount } = useTheme();
   const gStyles = globalStyles(theme);

   const [modalVisible, setModalVisible] = useState(false);
   const showIconDelimit = delimit && participants && participants?.length > 7;
   const participantList = showIconDelimit ? participants?.slice(0, 7) : participants;

   return (
      <>
         <View style={[gStyles.rowWrap, !simplified ? styles.containerParticipants : styles.simpleContainerParticipants]}>

            {participantList?.map((participant) => (

               <View key={participant.id}
                  style={[styles.participantItem, simplified && styles.simpleParticipantItem]}
               >
                  <UsersPreview
                     user={participant}
                     userInfo={showUserInfo}
                     size={size ?? 'normal'}
                     style={[
                        simplified && styles.simpleAvatar,
                        size === 'sm' && styles.avatarSm
                     ]}
                  />
                  {!simplified && onDelete && !isLoginUser(participant) && (
                     <TouchableOpacity
                        onPress={() => onDelete(participant.id)}
                        style={[styles.deleteButton, { backgroundColor: theme.colors.line }]}
                     >
                        <Image
                           source={require('../../assets/icons-general/close.png')}
                           style={[styles.deleteIcon, { tintColor: theme.colors.cardText }]}
                        />
                     </TouchableOpacity>
                  )}
               </View>
            ))}

            {onSelectParticipants && (
               <View style={[
                  styles.participantItem,
                  simplified && styles.simpleAvatar,
                  size === 'sm' && styles.avatarSm,
               ]}>
                  <TouchableOpacity
                     onPress={() => { setModalVisible(true); incrementModalCount() }}
                     style={[
                        styles.editButton,
                        gStyles.shadow,
                        simplified && styles.simpleEditButton,
                        { backgroundColor: theme.colors.buttonColor }]}
                  >
                     <StyledIcon src={require('../../assets/icons-general/edit.png')} type='button' />
                  </TouchableOpacity>
               </View>
            )}

            {showIconDelimit && (
               <View style={[
                  styles.simpleAvatar,
                  size === 'sm' && styles.avatarSm,
               ]}>
                  <View>
                     <StyledIcon src={require('../../assets/icons-general/dotsThree.png')} type='icon' />
                  </View>
               </View>
            )}
         </View>

         {onSelectParticipants && modalVisible && (
            <AddParticipantModal
               visible={modalVisible}
               onClose={() => { setModalVisible(false); decrementModalCount() }}
               onSelect={(selected) => {
                  onSelectParticipants(selected);
                  setModalVisible(false);
               }}
               users={users}
               isSelectedUsers={participants ?? []}
            />
         )}
      </>
   )
}

export default ParticipantsList

const styles = StyleSheet.create({

   containerParticipants: {
      width: '100%',
      alignContent: 'center',
      gap: 0
   },
   participantItem: {
      width: '33.33333333333333%',
      height: 115,
      alignItems: 'center',
      justifyContent: 'center',
   },
   deleteButton: {
      position: 'absolute',
      top: 0,
      right: 12,
      borderRadius: 10,
      padding: 2,
      zIndex: 1,
   },
   deleteIcon: {
      width: 15,
      height: 15,
   },
   editButton: {
      padding: 10,
      borderRadius: 40,
      marginBottom: 4,
      justifyContent: 'center',
      alignItems: 'center',
      width: 50,
      height: 50,

   },

   //Simple
   simpleContainerParticipants: {
      margin: 1,
      paddingLeft: 13,
   },
   simpleParticipantItem: {
      width: 'auto',
      height: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
   },
   simpleAvatar: {
      width: 25,
      height: 25,
      borderRadius: 40,
   },
   simpleEditButton: {
      width: 35,
      height: 35,
      padding: 0,
      marginBottom: 0
   },
   avatarSm: {
      width: 15,
      height: 15,
   },
});