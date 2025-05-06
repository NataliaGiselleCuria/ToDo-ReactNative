import { StyleSheet, View } from 'react-native'
import React from 'react'
import ButtonBack from './ButtonBack'
import { useCancelToHome } from '../hooks/useCancelToHome'
import StyledText from './styledComponets/StyledText'
import { globalStyles } from '../styles/globalStyles'
import { useTheme } from '@react-navigation/native'

type Props={
    title: string
}

const HeaderDrawer = ({title}:Props) => {
    const theme = useTheme();
    const gStyle = globalStyles();

    return (
        <View style={gStyle.headerDrawer}>
            <ButtonBack onPress={useCancelToHome} />
            <StyledText weight="medium">{title}</StyledText>
        </View>
    )
}

export default HeaderDrawer

const styles = StyleSheet.create({})