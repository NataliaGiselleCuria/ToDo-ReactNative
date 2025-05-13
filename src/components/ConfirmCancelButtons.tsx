import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { globalStyles } from '../styles/globalStyles'
import LinearGradient from 'react-native-linear-gradient'
import StyledButton from './styledComponets/StyledButton'

type Props = {
    handleSave: () => void,
    handleCancel: () => void,
}

const ConfirmCancelButtons = ({ handleSave, handleCancel }: Props) => {
    const { theme, decrementModalCount } = useTheme();
    const gStyles = globalStyles(theme);

    return (
        <LinearGradient
            colors={[theme.colors.backgroundTop, 'transparent',]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 0 }}
            style={styles.gradientButtons}
        >
            <View style={styles.containerButtons}>
                <StyledButton title="Confirmar" onPress={handleSave} style={{ marginTop: 5 }} />
                <StyledButton title="Cancelar" onPress={() => {handleCancel(); decrementModalCount()}} />
            </View>
        </LinearGradient>
    )
}

export default ConfirmCancelButtons

const styles = StyleSheet.create({
    containerButtons: {
        width: '100%',
        height: 120,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        gap: 5,
    },
    gradientButtons: {
        height: 140,
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        bottom: 0,
        left:0,
        paddingHorizontal: 5,
        justifyContent: 'flex-end',
    },
})