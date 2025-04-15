import { StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useState } from 'react'
import StyledText from '../styledComponets/StyledText'
import { useTheme } from '../../context/ThemeContext';
import { usePressScale } from '../../hooks/usePressScale';

type Props = {
    onPress: () => void;
    title: string;
};

const CreateListButton = ({ onPress, title }: Props) => {
    const { theme } = useTheme();
    const { scaleStyle, handlePressIn, handlePressOut } = usePressScale();

    return (
        <Animated.View style={[styles.container, scaleStyle]}>
            <TouchableOpacity
                onPress={onPress}
                style={styles.button}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <StyledText size='lg' weight='bold'
                    style={{
                        ...styles.buttonText,
                        color: theme.colors.cardText,
                    }}>
                    {title}
                </StyledText>
            </TouchableOpacity>
        </Animated.View>
    )
}

export default CreateListButton

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '90%',
        height: 150,
        overflow: 'hidden',
        borderTopLeftRadius: 110,
        backgroundColor: '#ff5e5e', // color del botón
    },
    button: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        letterSpacing: 1.5
    }
});