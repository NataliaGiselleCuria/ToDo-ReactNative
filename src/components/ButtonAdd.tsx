import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StyledText from './styledComponets/StyledText'
import StyledIcon from './styledComponets/StyledIcon'
import { useTheme } from '../context/ThemeContext'
import { globalStyles } from '../styles/globalStyles'

type Props = {
    elementoToAdd: string
    onPress: () => void
}
const ButtonAdd = ({ elementoToAdd, onPress }: Props) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    return (
        <TouchableOpacity style={styles.buttonAdd} onPress={() => onPress()}>
            <StyledText>Agregar {elementoToAdd}</StyledText>
            <View style={[styles.buttonAddIcon, { backgroundColor: theme.colors.buttonColor }]}>
                <StyledIcon src={require('../assets/icons-general/add.png')} width='sm' height='sm' type='button' />
            </View>
        </TouchableOpacity>
    )
}

export default ButtonAdd

const styles = StyleSheet.create({
    buttonAddIcon: {
        padding: 5,
        borderRadius: 40,
    },
    buttonAdd: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,

    },
})