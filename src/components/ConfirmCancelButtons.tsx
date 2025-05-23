import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { globalStyles } from '../styles/globalStyles'
import LinearGradient from 'react-native-linear-gradient'
import StyledButton from './styledComponets/StyledButton'

type Props = {
    handleSave?: () => void,
    handleCancel: () => void,
    gradient?: boolean,
}

const ConfirmCancelButtons = ({ handleSave, handleCancel, gradient=true }: Props) => {
    const { theme, decrementModalCount } = useTheme();
    const gStyles = globalStyles(theme);

    return (
        gradient 
        ? (
             <LinearGradient
            colors={[theme.colors.backgroundTop, 'transparent',]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 0 }}
            style={[styles.gradientButtons, {height: handleSave ? 140 : 70}]}
        >
             <View style={[styles.containerButtons, {height: 120,}]}>
                {handleSave && <StyledButton title="Confirmar" onPress={handleSave} style={{ marginTop: 5 }} />}
                <StyledButton title="Cancelar" onPress={() => {handleCancel(); decrementModalCount()}} />
            </View>
        </LinearGradient>
        )
        :(
            <View style={[styles.containerButtons, {height: 'auto',}]}>
                {handleSave && <StyledButton title="Confirmar" onPress={handleSave} style={{ marginTop: 5 }} />}
                <StyledButton title="Cancelar" onPress={() => {handleCancel(); decrementModalCount()}} />
            </View>
        )   
    )
}

export default ConfirmCancelButtons

const styles = StyleSheet.create({
    containerButtons: {
        width: '100%',     
        alignSelf: 'center',
        justifyContent: 'flex-end',
        gap: 5,
    },
    gradientButtons: {
        width: '100%',
        position: 'absolute',
        zIndex: 2,
        bottom: 0,
        left:0,
        paddingHorizontal: 5,
        justifyContent: 'flex-end',
    },


})