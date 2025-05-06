import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyledInput from '../styledComponets/StyledInput';
import UsersPreview from './UsersPreview';
import { FlatList } from 'react-native-gesture-handler';
import { User } from '../../types/types';
import { globalStyles } from '../../styles/globalStyles';
import { useTheme } from '../../context/ThemeContext';
import { StyledModal } from '../styledComponets/StyledModal';

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

        <StyledModal visible={visible} onSave={confirmSelection} onClose={onClose} scrollView={false} >

            <StyledInput
                placeholder="Buscar usuarios..."
                value={search}
                onChangeText={setSearch}
            />

            <FlatList
                style={styles.containerList}
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => {
                    const isSelected = selectedUsers.some(u => u.id === item.id);
                    return (
                        <TouchableOpacity
                            onPress={() => toggleUser(item)}
                            style={[
                                styles.userItem,
                                isSelected && styles.selectedUser,
                                isSelected && gStyles.shadow,
                                isSelected && { backgroundColor: theme.colors.background }
                            ]}>
                            <UsersPreview user={item} />
                        </TouchableOpacity>
                    )
                }}
            />

        </StyledModal>
    )
}

export default AddParticipantModal

export const styles = StyleSheet.create({

    containerList: {
        height: '90%',
        flex: 1,
        borderWidth:1
    },
    userItem: {
        flex: 1,
        minWidth: '45%',
        padding: 5,
        alignItems: 'center',
        margin: 5,
    },
    selectedUser: {
        borderRadius: 5,
    },
});