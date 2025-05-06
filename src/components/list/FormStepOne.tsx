import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDateRangeValidation } from '../../hooks/useDateRangeValidation';
import StyledInput from '../styledComponets/StyledInput';
import StyledText from '../styledComponets/StyledText';
import DateSelector from '../DateSelector';
import OptionsListLayout from '../OptionsListLayout';
import { globalStyles } from '../../styles/globalStyles';
import { useTheme } from '../../context/ThemeContext';
import { CategoriesList } from '../../types/types';

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

  const [scheduleStartDate, setScheduleStartDate] = useState<boolean>(defaultValues.scheduleStartDate || false);
  const [scheduleStartTime, setScheduleStartTime] = useState<boolean>(defaultValues.scheduleStartTime ?? false);
  const [startDate, setStartDate] = useState<Date | undefined>(defaultValues.startDate || undefined);
  const [startTime, setStartTime] = useState<Date | undefined>(defaultValues.startTime || undefined);

  const [scheduleEndDate, setScheduleEndDate] = useState<boolean>(defaultValues.scheduleEndDate ?? false);
  const [scheduleEndTime, setScheduleEndTime] = useState<boolean>(defaultValues.scheduleEndTime ?? false);
  const [endDate, setEndDate] = useState<Date | undefined>(defaultValues.endDate || undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(defaultValues.endTime || undefined);

  const { validateStartDate, validateEndDate } = useDateRangeValidation();

  useEffect(() => {
    onChange({ name, description, category, endDate, startDate, scheduleStartDate, scheduleEndDate, scheduleStartTime, scheduleEndTime, startTime, endTime });
    !scheduleEndDate && setScheduleEndTime(false);
  }, [name, description, category, endDate, startDate, scheduleStartDate, scheduleEndDate, scheduleStartTime, scheduleEndTime, startTime, endTime]);

  const handleDateChange = (
    type: 'startDate' | 'startTime' | 'endDate' | 'endTime',
    value: Date | undefined,
    validate: typeof validateStartDate | typeof validateEndDate
  ) => {

    const newStartDate = type === 'startDate' ? value : startDate;
    const newStartTime = type === 'startTime' ? value : startTime;
    const newEndDate = type === 'endDate' ? value : endDate;
    const newEndTime = type === 'endTime' ? value : endTime;

    const {
      startDate: validatedStart,
      startTime: validatedTime,
      endDate: validatedEnd,
      endTime: validatedEndTime
    } = validate(newStartDate, newStartTime, newEndDate, newEndTime);

    setStartDate(validatedStart);
    setStartTime(validatedTime);
    setEndDate(validatedEnd);
    setEndTime(validatedEndTime);

    setScheduleStartDate(!!validatedStart);
    setScheduleStartTime(!!validatedTime);
    setScheduleEndDate(!!validatedEnd);
    setScheduleEndTime(!!validatedEndTime);

  }

  const handleStartDateChange = (date: Date | undefined) =>
    handleDateChange('startDate', date, validateStartDate);

  const handleStartTimeChange = (date: Date | undefined) =>
    handleDateChange('startTime', date, validateEndDate);

  const handleEndDateChange = (date: Date | undefined) =>
    handleDateChange('endDate', date, validateEndDate);

  const handleEndTimeChange = (date: Date | undefined) =>
    handleDateChange('endTime', date, validateEndDate);

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




