import { StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import StyledText from './StyledText'
import { Switch } from 'react-native-gesture-handler';

type Props = {
   title: string;
   value: string | null;
   onChange: (value: string | null) => void;
   style?: ViewStyle;
   direction?: 'row' | 'column';
}

const StyledSwitch = ({ title, value, onChange, direction = 'column', style }: Props) => {

   const isEnabled = value === 'Sí';

   const toggleSwitch = () => {
      onChange(isEnabled ? null : 'Sí');
   };

   return (
      <View style={[styles.container, { flexDirection: direction }, style]}>
         <StyledText size='sm'>{title}</StyledText>
         <Switch
            value={isEnabled}
            onValueChange={toggleSwitch}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#007AFF' : '#f4f3f4'}
          />
      </View>
   )
}

export default StyledSwitch

const styles = StyleSheet.create({
   container: {
      flexWrap: 'wrap',
      alignItems: 'center',
      gap: '5'
   },
});