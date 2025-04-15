import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import React from 'react'
import StyledText from './styledComponets/StyledText'

type Props = {
    onPress?: () => void;
};

const ButtonBack = ({ onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Image source={require('../assets/icons-general/goBack.png')} style={styles.icon} />
                <StyledText>Volver</StyledText>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonBack

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 60,
        height: 65,
        justifyContent: 'center'
    },
    icon: {
        width: 24,
        height: 24,
    },
});