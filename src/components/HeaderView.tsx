import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ButtonBack from './ButtonBack'
import StyledText from './styledComponets/StyledText'
import StyledIcon from './styledComponets/StyledIcon'
import { User } from '../types/types'
import CheckPermission from '../utils/checkPermission'

import { loggedUser } from '../services/mockUsers'; //user de prueba

type Props = {
    onPressBack: () => void,
    onPressEdit: () => void,
    name: string,
    editedObject: string,
    allowedUsers?: User[]
}


const HeaderView = ({name, editedObject, allowedUsers, onPressBack, onPressEdit}: Props) => {

    const handleEdit = () => {
        if (!allowedUsers) {
            Alert.alert(`No hay usuarios autorizados para editar esta ${editedObject}`);
            return;
        }
        CheckPermission(editedObject, allowedUsers, loggedUser, () => {
            onPressEdit();
        });
    };

    return (
        <View style={styles.header}>
            <View style={styles.headerTitle}>
                <ButtonBack onPress={onPressBack} />
                <StyledText size='lg'>{name}</StyledText>
            </View>
            <TouchableOpacity onPress={handleEdit}>
                <StyledIcon src={require('../assets/icons-general/edit.png')} />
            </TouchableOpacity>
        </View>
    )
}

export default HeaderView

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5
    },
})