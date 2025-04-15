import { StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { User } from '../../types/types';
import UsersPreview from '../UsersPreview';
import { useTheme } from '../../context/ThemeContext';
import AddParticipantModal from '../AddParticipantModal';
import StyledText from '../styledComponets/StyledText';

type Props = {
  participants: User[];
  onDelete?: (id: number) => void;
  isLoginUser?: (user: User) => boolean;
  onSelectParticipants: (selected: User[]) => void;
  users: User[];
};

const ParticipantsList: React.FC<Props> = ({ participants, onDelete, onSelectParticipants, users, isLoginUser = () => false }) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.container}>
        {participants.map((participant) => (
          <View key={participant.id} style={styles.participantItem}>
            <UsersPreview user={participant} />
            {onDelete && !isLoginUser(participant) && (
              <TouchableOpacity onPress={() => onDelete(participant.id)} style={styles.deleteButton}>
                <Image source={require('../../assets/icons-general/close.png')} style={styles.deleteIcon} />
              </TouchableOpacity>
            )}
          </View>
        ))}
        {onDelete &&
          <View style={styles.participantItem}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={[styles.editButton, { backgroundColor: theme.colors.buttonColor }]}>
              <Image source={require('../../assets/icons-general/edit.png')} style={[styles.editIcon, { tintColor: theme.colors.cardText }]} />
            </TouchableOpacity>
          </View>
        }
      </View>
      <AddParticipantModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={(selected) => {
          onSelectParticipants(selected);
          setModalVisible(false);
        }}
        users={users}
        isSelectedUsers={participants}
      />
    </>
  )
}

export default ParticipantsList

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  participantItem: {
    position: 'relative',
    width: 115,
    height: 115,
    alignItems: 'center',
    justifyContent:'center',
    margin: 4,
  },
  deleteButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
    elevation: 3, // sombra si querés
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
  editIcon: {
    width: 24,
    height: 24,
  },
});