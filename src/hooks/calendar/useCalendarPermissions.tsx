import { useState } from 'react';
import { addToSystemCalendar, editCalendarEvent, deleteCalendarEvent } from '../../utils/calendarUtils';
import { useTheme } from '../../context/ThemeContext';
import { globalStyles } from '../../styles/globalStyles';
import { combineDateAndTime } from '../../utils/dateUtils';
import { CalendarData, EventConfigDates } from '../../types/types';
import StyledAlert from '../../components/styledComponets/StyledAlert';

export const useCalendarPermission = () => {
   const { theme, incrementModalCount, decrementModalCount } = useTheme();
   const gStyles = globalStyles(theme);
   const [permissionShowModal, setPermissionShowModal] = useState(false);
   const [onFinish, setOnFinish] = useState<(newEventId?: string) => void>(() => () => { });
   const [calendarData, setCalendarData] = useState<any>(null);
   const [calendarAction, setCalendarAction] = useState<'add' | 'edit' | 'delete'>('add');

   const openPermissionModal = (
      data: any,
      callback: (success: boolean, newEventId?: string,) => void,
      mode: 'add' | 'edit' | 'delete',
   ) => {
      setCalendarData(data);
      setOnFinish(() => (newEventId?: string) => callback(true, newEventId));
      setPermissionShowModal(true);
      setCalendarAction(mode);
      incrementModalCount()
   };

   const confirmAddToCalendar = async (): Promise<boolean | undefined> => {

      const eventConfigDates = getEventConfigDates(calendarData)

      const eventCalendarData = {
         idEventCalendar: calendarData.idEventCalendar ?? null,
         title: calendarData.name,
         description: calendarData.description,
         startDate: eventConfigDates.startDateEvent,
         endDate: eventConfigDates.endDateEvent,
         allDay: eventConfigDates.allDay,
      };

      try {
         if (calendarAction === 'edit' && calendarData.idEventCalendar) {
            const calendarResult = await editCalendarEvent(eventCalendarData);

             console.log (calendarResult)
            if (calendarResult.success) {
               onFinish?.(calendarResult.eventIdentifier);
               return true;
            } else {
               return false;
            }

         } else if (calendarAction === 'delete' && calendarData.idEventCalendar) {
            const calendarResult = await deleteCalendarEvent(calendarData.calendarEventId);

            if (calendarResult.success) {
               onFinish?.();
               return true;
            } else {
               return false;
            }

         } else if (calendarAction === 'add') {

            const newEventIdResult = await addToSystemCalendar(eventCalendarData);

            if (newEventIdResult.success) {
               onFinish?.(newEventIdResult.eventIdentifier);
               return true;
            } else {
               onFinish?.();
               return false;
            }
         }
      } catch (err) {        
         onFinish?.();
         return false;

      } finally {
         setPermissionShowModal(false);
         decrementModalCount();
         setCalendarData(null);
         setCalendarAction('add');
      }
   };

   const handlePermissions = async (shouldDo: boolean): Promise<boolean> => {
      setPermissionShowModal(false);
      decrementModalCount();

      if (shouldDo) {
         await confirmAddToCalendar();
         return true
      } else {
         onFinish?.();
         return false
      }
   };

   const getModalMessage = () => {
      switch (calendarAction) {
         case 'edit':
            return '¿Querés editar este evento en el calendario del sistema?';
         case 'delete':
            return '¿Querés eliminar este evento del calendario del sistema?';
         default:
            return '¿Querés agregar esta lista al calendario del sistema?';
      }
   };

   const getConfirmationButtonText = () => {
      switch (calendarAction) {
         case 'edit':
            return 'Sí, editar';
         case 'delete':
            return 'Sí, eliminar';
         default:
            return 'Sí, agregar';
      }
   };

   const getEventConfigDates = (calendarData: CalendarData): EventConfigDates => {
      let startDateEvent;
      let endDateEvent;
      let allDay = false;

      if (calendarData?.startDate) { //si hay fecha de inicio -> si tiene hora se concatena, si no solo es la fecha,
         startDateEvent =
            calendarData?.startTime
               ? combineDateAndTime(calendarData.startDate, calendarData.startTime)
               : calendarData.startDate;

         if (!calendarData.startTime && !calendarData.endTime && !calendarData.endDate) { // si solo hay fecha de inicio se setea fecha de fin para el mismo dia -todo el dia-
            allDay = true;
            endDateEvent = startDateEvent;
         }
      };

      if (calendarData?.endDate) { //si hay fecha de fin -> si tiene hora se concatena, si no solo es la fecha,
         endDateEvent =
            calendarData?.endTime
               ? combineDateAndTime(calendarData.endDate, calendarData.endTime,)
               : calendarData.endDate;
      };

      if ((calendarData?.startDate && calendarData?.endDate) && (!calendarData?.startTime && !calendarData?.endTime)) { // si solo hay fecha de inicio y fin  se setea -todo el dia- para ambos
         allDay = true;
      };

      return {
         startDateEvent,
         endDateEvent,
         allDay,
      };
   };


   const CalendarPermissionModal = () => (
      <StyledAlert
         visible={permissionShowModal}
         message={getModalMessage()}
         onClose={() => handlePermissions(false)}
         buttons={[
            {
               text: getConfirmationButtonText(),
               onPress: () => handlePermissions(true)
            },
            { text: 'No', onPress: () => handlePermissions(false) }
         ]}>

      </StyledAlert>
   );

   return {
      openPermissionModal,
      CalendarPermissionModal,
   };
}
