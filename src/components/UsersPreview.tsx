import { StyleSheet, Text, View, Image, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { User } from '../types/types'
import StyledText from './styledComponets/StyledText';

type Props = {
    user: User;
    style?: StyleProp<ViewStyle>;
};

const UsersPreview = ({ user, style }: Props) => {

    return (
        <View style={[styles.container, style]}>
            <Image source={user.avatar ? user.avatar : require('../assets/avatars/ghost.png')} style={styles.avatar} />
            <StyledText style={{ textAlign: 'center' }}>{user.username}</StyledText>
            <StyledText size='sm'>#{user.id}</StyledText>
        </View>
    )
}

export default UsersPreview

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',

    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30,
        objectFit: 'contain'
    },
})