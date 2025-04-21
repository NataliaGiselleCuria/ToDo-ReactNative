import { View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoriesList } from '../../types/types';


import StyledInput from '../styledComponets/StyledInput';
import StyledText from '../styledComponets/StyledText';
import DateSelector from '../DateSelector';
import { useDateRangeValidation } from '../../hooks/useDateRangeValidation';
import OptionsListLayout from '../OptionsListLayout';

type StepOneProps = {
  onChange: (data: { name: string; description: string; category: CategoriesList, scheduleStartDate:boolean, scheduleEndDate:boolean, startDate?: Date, endDate?: Date }) => void;
  defaultValues: {
    name: string;
    description: string;
    category: CategoriesList;
    scheduleStartDate:boolean,
    scheduleEndDate:boolean,
    startDate?: Date;
    endDate?: Date;
  };
};

const FormStepOne: React.FC<StepOneProps> = ({ onChange, defaultValues }) => {
  const [name, setName] = useState(defaultValues.name || "Nueva Lista");
  const [category, setCategory] = useState<CategoriesList>(defaultValues.category || CategoriesList.others);
  const [description, setDescription] = useState(defaultValues.description || "");
  const [scheduleStartDate, setScheduleStartDate] = useState<boolean>(defaultValues.scheduleStartDate || false);
  const [scheduleEndDate, setScheduleEndDate] = useState<boolean>(defaultValues.scheduleEndDate || false);
  const [startDate, setStartDate] = useState<Date | undefined>(defaultValues.startDate || undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(defaultValues.endDate || undefined);
  const { validateStartDate, validateEndDate } = useDateRangeValidation();
  

  useEffect(() => {
    onChange({ name, description, category, endDate, startDate, scheduleStartDate, scheduleEndDate });
  }, [name, description, category, endDate, startDate, scheduleStartDate, scheduleEndDate]);

  const handleStartDateChange = (date: Date | undefined) => {
    const { startDate: validatedStart, endDate: validatedEnd } = validateStartDate(date, endDate);
    setStartDate(validatedStart);
    setEndDate(validatedEnd);
    setScheduleStartDate(!!validatedStart);
  };
  
  const handleEndDateChange = (date: Date | undefined) => {
    const { startDate: validatedStart, endDate: validatedEnd } = validateEndDate(startDate, date);
    setStartDate(validatedStart);
    setEndDate(validatedEnd);
    setScheduleEndDate(!!validatedEnd);
  };
  
  
  return (
    <View style={{ gap: 15 }}>
      <View>
        <StyledText>Nombre de la lista</StyledText>
        <StyledInput value={name} onChangeText={setName} placeholder="Mi lista" />
      </View>

      <View>
        <StyledText>Categoría</StyledText>
        <View>
          <OptionsListLayout selectedCategory={category} onSelectCategory={setCategory} />
        </View>
      </View>

      <View>
        <StyledText>Descripción</StyledText>
        <StyledInput value={description} onChangeText={setDescription} placeholder="Opcional" />
      </View>

      <DateSelector
        label="Fecha de inicio"
        value={startDate}
        onChange={handleStartDateChange}
        selectedByDefault={scheduleStartDate}
        defaultValueIfDisabled={new Date()}
      />

      <DateSelector
        label="Fecha límite"
        value={endDate}
        onChange={handleEndDateChange}
        selectedByDefault={scheduleEndDate}
        defaultValueIfDisabled={undefined}
      />

      
    </View>
  )
}

export default FormStepOne;


