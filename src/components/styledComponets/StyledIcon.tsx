import { StyleSheet, Image, ImageSourcePropType, StyleProp, ImageStyle } from 'react-native'
import React from 'react'
import { useTheme } from '../../context/ThemeContext'
import { globalStyles } from '../../styles/globalStyles'

type Props = {
    src: ImageSourcePropType
    width?: 'sm' | 'md' | 'lg' | 'xl',
    height?: 'sm' | 'md' | 'lg' | 'xl',
    style?: StyleProp<ImageStyle>;
    type?: 'icon' | 'button'
}

const StyledIcon: React.FC<Props> = ({ src, width = 'md', height = 'md', type = 'icon', style }) => {
    const { theme } = useTheme();
    const gStyles = globalStyles(theme);

    const widthMap = {
        sm: 20,
        md: 24,
        lg: 30,
        xl: 60
    };

    const heightMap = {
        sm: 20,
        md: 24,
        lg: 30,
        xl: 60
    };

    const typeMap ={
        icon: theme.colors.text,
        button: theme.colors.cardText
    }

    return (
        <Image
            source={src}
            style={[
                {
                  tintColor: typeMap[type],
                  width: widthMap[width],
                  height: heightMap[height],
                },
                style, 
              ]}
        />
    )
}

export default StyledIcon

const styles = StyleSheet.create({})