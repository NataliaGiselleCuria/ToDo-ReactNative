import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import StyledSwitch from './styledComponets/StyledSwitch';
import StyledText from './styledComponets/StyledText';
import StyledIcon from './styledComponets/StyledIcon';
import { useTheme } from '../context/ThemeContext';


type Props = {
   label: string;
   value: Date | undefined;
   onChange: (date: Date | undefined) => void;
   defaultValueIfDisabled?: Date | undefined;
   selectedByDefault?: boolean;
};

const DateSelector = ({ label, value, onChange, defaultValueIfDisabled, selectedByDefault }: Props) => {
   const { theme } = useTheme();

   const [selectedOption, setSelectedOption] = useState<string | null>(
      selectedByDefault ? 'Sí' : null
   );
   const [openPicker, setOpenPicker] = useState(false);

   useEffect(() => {
      setSelectedOption(selectedByDefault ? 'Sí' : null);
   }, [selectedByDefault]);

   return (
      <View>
         <StyledText>{label}:</StyledText>
         <StyledText>{value?.toLocaleString('es-AR') || "No seleccionada"}</StyledText>
         <View style={styles.containerSwitch}>
            <StyledSwitch
               direction="row"
               title={`¿Programar ${label.toLowerCase()}?`}
               value={selectedOption}
               onChange={(val) => {
                  setSelectedOption(val);
                  if (val === 'Sí') {
                     setOpenPicker(true);
                  } else {
                     onChange(defaultValueIfDisabled ?? undefined);
                  }
               }}
            />
            <TouchableOpacity
               onPress={() => setOpenPicker(true)}
               disabled={selectedOption !== 'Sí'}
               style={[styles.buttonCalendar, { backgroundColor: theme.colors.buttonColor }]}>
               <StyledIcon src={require('../assets/icons-general/calendar.png')} type='button' />
            </TouchableOpacity>
         </View>
         <DatePicker
            modal
            title={label}
            minuteInterval={15}
            open={openPicker}
            date={value instanceof Date ? value : new Date()}
            onConfirm={(date) => {
               setOpenPicker(false);
               onChange(date);

            }}
            onCancel={() => setOpenPicker(false)}
         />
      </View >
   );
};

export default DateSelector;

const styles = StyleSheet.create({
   containerSwitch: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   buttonCalendar: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 5
   }
});