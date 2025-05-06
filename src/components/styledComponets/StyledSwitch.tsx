import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import StyledText from './StyledText'
import { Switch } from 'react-native-gesture-handler';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';

type Props = {
   title?: string;
   value: string | null;
   disabled?: boolean;
   onChange: (value: string | null) => void;
   style?: ViewStyle;
   direction?: 'row' | 'column';
}

const StyledSwitch = ({ title, value, disabled = false, onChange, direction='row', style }: Props) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const isEnabled = value === 'Sí';

   const toggleSwitch = () => {
      onChange(isEnabled ? null : 'Sí');
   };

   return (
      <View style={[{ flexDirection: direction}, style, gStyles.shadow]}>
         {title && <StyledText size='sm'>{title}</StyledText>}
         <Switch
            disabled={disabled}
            value={isEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: theme.colors.buttonColor + 44, true: theme.colors.buttonColor + 88 }}
            thumbColor={isEnabled ? theme.colors.buttonColor : '#f4f3f4'}
         />
      </View>
   )
}

export default StyledSwitch

const styles = StyleSheet.create({
   
});