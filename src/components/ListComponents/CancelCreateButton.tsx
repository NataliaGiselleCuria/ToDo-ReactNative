import { StyleSheet, TouchableOpacity, Animated } from 'react-native'
import React, { useState } from 'react'
import StyledText from '../styledComponets/StyledText'
import { useCancelToHome } from '../../hooks/useCancelToHome';
import { useCreateList } from '../../context/lists/CreateListContext';
import { useTheme } from '../../context/ThemeContext';
import { Svg, Circle } from 'react-native-svg';
import { usePressScale } from '../../hooks/usePressScale';

const CancelCreateButton = () => {
    const { theme } = useTheme();
    const { scaleStyle, handlePressIn, handlePressOut } = usePressScale();
    const cancelToHome = useCancelToHome();
    const { resetListData } = useCreateList();

    const cancelCreate = () => {
        resetListData();
        cancelToHome();
    }

    return (
        <Animated.View style={[styles.container, scaleStyle]}>
            <Svg height="110" width="110" style={styles.svg}>
                <Circle
                    cx="100"
                    cy="10"
                    r="70"
                    stroke={theme.colors.buttonColor}
                    strokeWidth="60"
                    fill={theme.colors.buttonColor}
                />
            </Svg>
            <TouchableOpacity
                onPress={cancelCreate}
                style={styles.touchArea}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
            >
                <StyledText size='sm' style={{color: theme.colors.cardText}}>Cancelar</StyledText>
            </TouchableOpacity> 
        </Animated.View>
    );
};

export default CancelCreateButton;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        right: 0,
        width: 120,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    svg: {
        position: 'absolute',
        zIndex: 1,
        top: 0,
        right: 0,
    },
    touchArea: {
        zIndex: 2,
        position: 'absolute',
        top: 0,
        right: 0,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
});