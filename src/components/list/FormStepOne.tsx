import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDateRangeValidation } from '../../hooks/calendar/useDateRangeValidation';
import { globalStyles } from '../../styles/globalStyles';
import { useTheme } from '../../context/ThemeContext';
import { useDatesSchedule } from '../../hooks/calendar/useDateScheduler';
import { CategoriesList } from '../../types/types';
import StyledInput from '../styledComponets/StyledInput';
import StyledText from '../styledComponets/StyledText';
import DateSelector from '../DateSelector';
import OptionsListLayout from '../OptionsListLayout';


type StepOneProps = {
  onChange: (data:
    {
      name: string;
      description?:
      string; category:
      CategoriesList,
      scheduleStartDate: boolean,
      scheduleStartTime: boolean,
      startDate?: Date,
      startTime?: Date,
      scheduleEndDate: boolean,
      scheduleEndTime: boolean,
      endDate?: Date,
      endTime?: Date,
    }) => void;

  defaultValues: {
    name: string;
    description?: string;
    category: CategoriesList;
    scheduleStartTime: boolean,
    scheduleStartDate: boolean,
    startDate?: Date;
    startTime?: Date;
    scheduleEndDate: boolean,
    scheduleEndTime: boolean,
    endDate?: Date;
    endTime?: Date;
  };

};

const FormStepOne: React.FC<StepOneProps> = ({ onChange, defaultValues }) => {
  const { theme } = useTheme();
  const gStyles = globalStyles(theme);

  const [name, setName] = useState(defaultValues.name || "Nueva Lista");
  const [category, setCategory] = useState<CategoriesList>(defaultValues.category || CategoriesList.others);
  const [description, setDescription] = useState(defaultValues.description ?? "");

  const { validateStartDate, validateEndDate } = useDateRangeValidation();

  const {
    startDate, startTime, endDate, endTime,
    scheduleStartDate, scheduleStartTime, scheduleEndDate, scheduleEndTime, setScheduleEndTime,
    handleDateChange
  } = useDatesSchedule(defaultValues, validateStartDate, validateEndDate)

  const handleStartDateChange = (date: Date | undefined) =>
    handleDateChange('startDate', date, validateStartDate);

  const handleStartTimeChange = (date: Date | undefined) =>
    handleDateChange('startTime', date, validateEndDate);

  const handleEndDateChange = (date: Date | undefined) =>
    handleDateChange('endDate', date, validateEndDate);

  const handleEndTimeChange = (date: Date | undefined) =>
    handleDateChange('endTime', date, validateEndDate);

  useEffect(() => {
    onChange({ name, description, category, endDate, startDate, scheduleStartDate, scheduleEndDate, scheduleStartTime, scheduleEndTime, startTime, endTime });
    !scheduleEndDate && setScheduleEndTime(false);
  }, [name, description, category, endDate, startDate, scheduleStartDate, scheduleEndDate, scheduleStartTime, scheduleEndTime, startTime, endTime]);

  return (
    <View style={gStyles.gapContainer}>
      <View style={gStyles.itemForm}>
        <StyledText>Nombre de la lista</StyledText>
        <StyledInput value={name} onChangeText={setName} placeholder="Mi lista" />
      </View>

      <View style={gStyles.itemForm}>
        <StyledText>Descripción</StyledText>
        <StyledInput value={description} onChangeText={setDescription} placeholder="Opcional" />
      </View>

      <View style={gStyles.itemForm}>
        <StyledText>Categoría</StyledText>
        <OptionsListLayout selectedCategory={category} onSelectCategory={setCategory} />
      </View>
      <View style={gStyles.itemForm}>
        <View style={gStyles.rowBetween}>
          <DateSelector
            mode="date"
            type='startDate'
            label="Fecha inicio"
            value={startDate}
            onChange={(handleStartDateChange)}
            selectedByDefault={scheduleStartDate}
            defaultValueIfDisabled={undefined}
          />
          <DateSelector
            mode="time"
            type='startTime'
            label="Hora"
            value={startTime}
            onChange={handleStartTimeChange}
            selectedByDefault={scheduleStartTime}
            defaultValueIfDisabled={undefined}
          />
        </View>
      </View>

      <View style={gStyles.itemForm}>
        <View style={gStyles.rowBetween}>
          <DateSelector
            mode="date"
            type='endDate'
            label="Fecha límite"
            value={endDate}
            onChange={handleEndDateChange}
            selectedByDefault={scheduleEndDate}
            defaultValueIfDisabled={undefined}
          />
          <DateSelector
            disabled={!scheduleEndDate}
            mode="time"
            type='endTime'
            label="Hora"
            value={endTime}
            onChange={handleEndTimeChange}
            selectedByDefault={scheduleEndTime}
            defaultValueIfDisabled={undefined}
          />
        </View>
      </View>
    </View>
  )
}

export default FormStepOne;
