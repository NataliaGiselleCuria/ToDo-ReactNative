import { StyleSheet, View } from 'react-native'
import React from 'react'
import StyledIcon from '../styledComponets/StyledIcon'
import { Priority, colorMapPriority } from '../../types/types';
import StyledText from '../styledComponets/StyledText';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';

type Props = {
   priority: Priority | undefined;
   text?: boolean
   color?:'button' | 'text',
   topPosition?: number
   size?: 'sm' | 'md' | 'lg'
};

const ItemPriority: React.FC<Props> = ({ priority, text, color, topPosition = 0, size = 'md' }) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);

   const iconColor = priority != undefined ? colorMapPriority[priority] : color==='button' ? theme.colors.cardText : theme.colors.textSecondary;
   const buttonColor = color==='button' ? theme.colors.cardText : theme.colors.textSecondary;

   return (
      <View style={styles.container}>
         <StyledIcon
            src={require('../../assets/icons-general/mark.png')}
            width={size} height={size} 
            style={{ tintColor: iconColor, position: 'absolute', top: topPosition }}
         />
         <View style={{ marginLeft: 25, height: '100%', }}>
            {(!priority && text) && 
            <StyledText size='sm' 
            style={{color: buttonColor}} >Sin prioridad</StyledText>}
            {text && <StyledText size='sm' style={{ color: iconColor }}>{priority}</StyledText>}
         </View>
      </View>
   )
}

export default ItemPriority

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      position: 'relative',
      height: '75%',
   }
})