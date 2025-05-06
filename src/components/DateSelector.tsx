import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import StyledSwitch from './styledComponets/StyledSwitch';
import StyledText from './styledComponets/StyledText';
import { useTheme } from '../context/ThemeContext';
import DatePreview from './DatePreview';
import { globalStyles } from '../styles/globalStyles';

type Props = {
   type: 'startDate' | 'startTime' | 'endDate' | 'endTime',
   label: string;
   value: Date | undefined;
   disabled?: boolean,
   onChange: (date: Date | undefined) => void;
   defaultValueIfDisabled?: Date;
   selectedByDefault?: boolean;
   mode?: 'date' | 'time' | 'datetime';
};

const DateSelector = ({ type, label, value, disabled, onChange, defaultValueIfDisabled, selectedByDefault, mode }: Props) => {
   const { theme } = useTheme();
   const gStyles = globalStyles(theme);
   const isDate = type.includes('Date') ?? true;
   const isStartDate = type === 'startDate';

   const [selectedOption, setSelectedOption] = useState<string | null>(selectedByDefault ? 'Sí' : null);
   const [openPicker, setOpenPicker] = useState(false);

   useEffect(() => {
      if (disabled && type === 'endTime') {
         setSelectedOption(null);
         onChange(defaultValueIfDisabled ?? undefined);
      }
   }, [disabled, type]);

   return (
      <View style={[gStyles.itemForm, { width: '48%' }]}>
         <View style={gStyles.row}>
            <StyledText>{label}:</StyledText>
            <StyledSwitch
               disabled={disabled}
               value={selectedOption}
               onChange={(val) => {
                  setSelectedOption(val);
                  (val === 'Sí') ? setOpenPicker(true) : onChange(defaultValueIfDisabled ?? undefined);
               }}
            />
         </View>

         <TouchableOpacity
            onPress={() => setOpenPicker(true)}
            disabled={selectedOption !== 'Sí' || disabled}
            style={[
               styles.buttonCalendar,
               { backgroundColor: theme.colors.buttonColor },
               selectedOption === 'Sí' ? gStyles.shadow : gStyles.buttonDisabled
            ]}>
            {value
               ? <DatePreview value={value} type={type} justify='flex-start' color={selectedOption === 'Sí' ? 'buttonColor' : 'text'} />
               : <StyledText size='sm'
                  style={gStyles.lineHeightSm}>{
                     isStartDate ? 'Hoy'
                        : isDate ? 'No selecionada' : 'Todo el día'}
               </StyledText>

            }
         </TouchableOpacity>
          
         <DatePicker
            mode={mode}
            modal
            theme={theme.colors.text === '#ffffff' ? 'dark' : 'light'}
            locale="es"
            confirmText="Confirmar"
            cancelText="Cancelar"
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
   buttonCalendar: {

      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      padding: 5
   }
});