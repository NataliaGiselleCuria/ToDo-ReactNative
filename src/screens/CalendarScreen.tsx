import { StyleSheet, View, Text } from 'react-native'
import React, { useState } from 'react'
import StyledContainer from '../components/styledComponets/StyledContainer'
import { Calendar } from 'react-native-calendars';
import { useListContext } from '../context/lists/ListContext';
import { FilterOptions, useMarkedDates } from '../hooks/calendar/useMarkedDates';


const CalendarScreen = () => {
  const { lists } = useListContext();
  const [selectedDay, setSelectedDay] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filters, setFilters] = useState<FilterOptions>({ sharedOnly: false });

  const markedDates = useMarkedDates(lists, selectedDay, filters);

  const isSelectedDay = (start: Date | string, end: Date | string | undefined, selected: string) => {
    const selectedStr = selected;
    const startStr = new Date(start).toISOString().split('T')[0];
    const endStr = end ? new Date(end).toISOString().split('T')[0] : null;

    if (endStr) {
      return selectedStr >= startStr && selectedStr <= endStr;
    }

    return selectedStr === startStr;
  };

  return (
    <StyledContainer>
      <Calendar
        markingType='multi-period'
        markedDates={markedDates}
        onDayPress={(day) => setSelectedDay(day.dateString)}
      />
      {selectedDay && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Eventos del {selectedDay}:</Text>
          {lists
            .filter(list => isSelectedDay(list.startDate, list.endDate, selectedDay))
            .map((list, index) => (
              <View
                key={index}
                style={{
                  padding: 10,
                  backgroundColor: '#fff',
                  marginVertical: 5,
                  borderRadius: 5,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>{list.name}</Text>
                <Text>
                  Desde{' '}
                  {list.startDate?.toLocaleDateString('es-AR')} hasta{' '}
                  {list.endDate?.toLocaleDateString('es-AR')}
                </Text>
              </View>
            ))}
        </View>
      )}
    </StyledContainer>

  )
}

export default CalendarScreen

const styles = StyleSheet.create({})