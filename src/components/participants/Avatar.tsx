import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';

type Props = {
    avatarUser: any
}

const Avatar: React.FC<Props> = ({ avatarUser }) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);
    
    return (
        <View style={[styles.wrapper, {backgroundColor:theme.colors.backgroundTop}]}>
            <Svg height="80" width="80" style={[styles.circle]}>
                <Circle
                    cx="40"
                    cy="40"
                    r="35"
                    stroke={theme.colors.buttonColor}
                    strokeWidth="2"
                    strokeDasharray="150 200"
                    strokeLinecap="round"
                    rotation="-80"
                    origin="40, 40"
                    fill="none"
                />
            </Svg>
            <Image source={avatarUser} style={[styles.avatar]} />
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: 80,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 40,
        overflow: 'hidden',
    },
    circle: {
        position: 'absolute',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        objectFit:'contain',

    },
});

export default Avatar

