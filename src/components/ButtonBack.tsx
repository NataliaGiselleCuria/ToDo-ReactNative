import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import StyledIcon from './styledComponets/StyledIcon';

type Props = {
    onPress?: () => void;
};

const ButtonBack = ({ onPress }: Props) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <StyledIcon src={require('../assets/icons-general/goBack.png')}/>
            </View>
        </TouchableOpacity>
    )
}

export default ButtonBack

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 'auto',
        height: 65,
        justifyContent: 'flex-start',
    }
});