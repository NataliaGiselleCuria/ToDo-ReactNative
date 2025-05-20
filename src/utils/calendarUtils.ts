import * as AddCalendarEvent from 'react-native-add-calendar-event';
import RNCalendarEvents from 'react-native-calendar-events';
// import moment from 'moment';
import moment from 'moment-timezone';
import { CalendarEventData } from '../types/types';

interface CalendarResult {
   success: boolean;
   message?: string;
   eventIdentifier?: string;
}

export const addToSystemCalendar = (data: CalendarEventData): Promise<CalendarResult> => {
   const formatEventConfigDates = formatDates(data)
   const { formattedStartDate, formattedEndDate } = formatEventConfigDates

   const eventConfig = {
      idEventCalendar: data.idEventCalendar,
      title: data.title,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      allDay: data.allDay,
      notes: data.description ?? 'Lista creada en la app',
   };

   return AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then((result) => ({
         success: result?.action === 'SAVED',
         eventIdentifier: result?.action === 'SAVED' ? result.eventIdentifier : undefined,
         message: result?.action === 'SAVED' ? 'Evento añadido al calendario.' : 'No se pudo añadir el evento al calendario.',
      }))
      .catch((error) => ({
         success: false,
         message: 'Error al intentar añadir el evento al calendario.',
         error,
      }));;
};

export const editCalendarEvent = async (data: CalendarEventData) => {

   if (!data.idEventCalendar) {
      return { success: false, message: 'No se encuentra el evento para editar.' };
   }

   const formatEventConfigDates = formatDates(data)
   const { formattedStartDate, formattedEndDate } = formatEventConfigDates
   if (!formattedStartDate || !formattedEndDate) {
      return { success: false, message: 'Fechas de inicio o fin inválidas para editar el evento.' };
   }

   if (!data.startDate || !data.endDate) {
      return { success: false, message: 'Fechas de inicio o fin inválidas para editar el evento.' };
   }

   const formatDatesStart = data.allDay ? moment(data.startDate.toISOString()).startOf('day').toISOString() : formattedStartDate
   const formatDatesEnd = data.allDay ? moment(data.endDate.toISOString()).endOf('day').toISOString() : formattedEndDate

   const eventConfig = {
      title: data.title,
      startDate: formatDatesStart,
      endDate: formatDatesEnd,
      allDay: data.allDay,
      notes: data.description ?? 'Lista creada en la app',
      eventId: data.idEventCalendar,
   };

   try {
      if (data.idEventCalendar) {

         await RNCalendarEvents.removeEvent(data.idEventCalendar)

         const status = await RNCalendarEvents.saveEvent(data.title, eventConfig);

         return { success: !!status, message: status ? 'Evento del calendario modificado con éxito.' : 'No se pudo modificar el evento del calendario.', eventIdentifier: status };
      } else {
         return { success: false, message: 'No se encontró el evento del calendario para modificar.' };
      }
   } catch (error) {
      return { success: false, message: 'Error al intentar modificar el evento del calendario.', error };
   }
}


export const deleteCalendarEvent = async (eventId: string) => {
   try {
      const success = await RNCalendarEvents.removeEvent(eventId);
      return { success, message: success ? `Evento del calendario eliminado con éxito.` : `No se pudo eliminar el evento del calendario.` };
   } catch (error) {
      console.error("Error deleting event:", error);
      return { success: false, message: 'Error al intentar eliminar el evento del calendario.', error };
   }
};

const formatDates = (data: CalendarEventData) => {
   let formattedStartDate: string | undefined;
   let formattedEndDate: string | undefined;

   if (data.startDate) {
      formattedStartDate = data.allDay ? moment.utc(data.startDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : data.startDate.toISOString();
   }

   if (data.endDate) {
      formattedEndDate = data.allDay ? moment.utc(data.endDate).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') : data.endDate.toISOString();

   }

   return { formattedStartDate, formattedEndDate }
}
