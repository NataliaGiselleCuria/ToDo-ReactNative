import * as AddCalendarEvent from 'react-native-add-calendar-event';

export const addToSystemCalendar = (title: string, startDate?: Date) => {
  const isoDate = startDate?.toISOString();

  const eventConfig = {
    title: title,
    startDate: isoDate,
    endDate: isoDate,
    notes: 'Lista creada en la app',
  };

  return AddCalendarEvent.presentEventCreatingDialog(eventConfig);
};