import { StyleSheet, Text, TouchableOpacity, View, Button, Dimensions } from 'react-native'
import Modal from "react-native-modal";
import React, { useEffect, useState } from 'react'
import { User } from '../../types/types';
import StyledInput from '../styledComponets/StyledInput';
import { FlatList } from 'react-native-gesture-handler';
import UsersPreview from './UsersPreview';
import StyledButton from '../styledComponets/StyledButton';
import { globalStyles } from '../../styles/globalStyles';
import { useTheme } from '../../context/ThemeContext';


type Props = {
    visible: boolean;
    onClose: () => void;
    onSelect: (users: User[]) => void;
    users: User[]; // contactos + otros usuarios
    isSelectedUsers: User[]; // usuarios seleccionados
};

const AddParticipantModal = ({ visible, onClose, onSelect, users, isSelectedUsers }: Props) => {
    const [search, setSearch] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
      const { theme } = useTheme();
     const gStyles = globalStyles(theme);

    useEffect(() => {
        setSelectedUsers(isSelectedUsers);
    }, [isSelectedUsers]);

    const toggleUser = (user: User) => {
        const exists = selectedUsers.find(u => u.id === user.id);
        if (exists) {
            setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
        } else {
            setSelectedUsers([...selectedUsers, user]);
        }
    };

    const confirmSelection = () => {
        onSelect(selectedUsers);
        onClose();
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) || user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal isVisible={visible} onBackdropPress={onClose} customBackdrop={<View style={{flex: 1}} />}>
            <View style={[gStyles.modalOverlay, gStyles.shadow, {backgroundColor: theme.colors.backgroundTop}]}>
                <View style={gStyles.modalContent}>
                    <StyledInput
                        placeholder="Buscar usuarios..."
                        value={search}
                        onChangeText={setSearch}
                        style={{ width: '100%' }}
                    />
                    <FlatList
                        data={filteredUsers}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        renderItem={({ item }) => {
                            const isSelected = selectedUsers.some(u => u.id === item.id);
                            return (
                                <TouchableOpacity onPress={() => toggleUser(item)} style={[styles.userItem, isSelected && styles.selectedUser]}>
                                    <UsersPreview user={item} />
                                </TouchableOpacity>
                            )
                        }}
                    />
                    <StyledButton title="Confirmar" onPress={confirmSelection} />
                    <StyledButton title="Cerrar" onPress={onClose} />
                </View>
            </View>
        </Modal>
       
    )
}

export default AddParticipantModal

export const styles = StyleSheet.create({

    userItem: {
        flex: 1,
        minWidth: '40%',
        alignItems: 'center',
        margin: 5,
    },

    selectedUser: {
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
    },

    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

    blur:{
        flex: 1,
        width: '100%',
        height: '100%',
        filter: 'blur(15px)',
        backgroundColor:'white'
    }
});