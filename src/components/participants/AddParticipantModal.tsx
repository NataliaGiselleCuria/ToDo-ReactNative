import { KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import StyledInput from '../styledComponets/StyledInput';
import UsersPreview from './UsersPreview';
import { FlatList } from 'react-native-gesture-handler';
import { User } from '../../types/types';
import { globalStyles } from '../../styles/globalStyles';
import { useTheme } from '../../context/ThemeContext';
import { StyledModal } from '../styledComponets/StyledModal';
import LinearGradient from 'react-native-linear-gradient';

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
            <LinearGradient
                colors={[theme.colors.backgroundTop, 'transparent',]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.gradientTop}
            >
                <StyledInput
                    placeholder="Buscar usuarios..."
                    value={search}
                    onChangeText={setSearch}
                    style={{ borderWidth: 1, marginTop: 10 }}

                />
            </LinearGradient>

            <FlatList
                keyboardShouldPersistTaps="handled"
                style={styles.containerList}
                data={filteredUsers}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item, index }) => {
                    const isSelected = selectedUsers.some(u => u.id === item.id);
                    const isFirstTwo = index < 2;
                    const isLastTwo = index >= filteredUsers.length - 2;
                    const isPair = index % 2 === 0;

                    const itemStyles = [
                        styles.userItem,
                        isSelected && styles.selectedUser,
                        isSelected && gStyles.shadow,
                        isSelected && { backgroundColor: theme.colors.background },
                    ]

                    if (isFirstTwo) {
                        itemStyles.push(styles.firstUserItems);
                    } else if (isLastTwo && isPair ) {
                        itemStyles.push(styles.lastsUserItems); 
                    }

                    return (
                        <TouchableOpacity
                            onPress={() => toggleUser(item)}
                            style={itemStyles}>
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
    gradientTop: {
        height: 120,
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        top: -10,
        left: 0,
    },
    containerList: {
        flex: 1,
        width: '100%',
        marginVertical: 50,
    },
    userItem: {
        flex: 1,
        minWidth: '45%',
        padding: 5,
        alignItems: 'center',
        margin: 5,
    },
    firstUserItems:{
        marginTop:15
    },
    lastsUserItems:{
        marginBottom:20
    },
    selectedUser: {
        borderRadius: 5,
    },
});