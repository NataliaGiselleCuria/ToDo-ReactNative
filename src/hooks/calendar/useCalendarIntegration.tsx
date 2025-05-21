import { useState } from 'react';
import { CalendarData, Item, List } from '../../types/types';
import { useCalendarPermission } from './useCalendarPermissions';
import StyledAlert from '../../components/styledComponets/StyledAlert';

type CalendarAction = 'add' | 'edit';

type Params<T> = {
    data: Item | List;
    action: CalendarAction;
    showSuccesMessage?: boolean;
    onSuccess: (newEventId?: string) => void;
    onError?: () => void;
};

export const useCalendarIntegration = () => {
    const { openPermissionModal, CalendarPermissionModal } = useCalendarPermission();
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'Éxito' | 'Error'>('Éxito');

    const executeCalendarAction = <T extends { idEventCalendar?: string }>(
        { data, action, onSuccess, onError, showSuccesMessage = false }: Params<T>
    ) => {

        const listData = (data: List | Item): data is List => {
            return (data as List).participants !== undefined;
        };

        const dataType = listData(data) ? ' la lista' : 'el ítem';

        const dataCalendar: CalendarData = {
            idEventCalendar: data.idEventCalendar,
            name: data.name,
            description: data.description,
            startDate: data.startDate,
            startTime: data.startTime,
            endDate: data.endDate,
            endTime: data.endTime,
        };

        openPermissionModal(
            { ...dataCalendar },
            (success, newEventId) => {
                if (!success) {
                    setAlertMessage(
                        action === 'add'
                            ? `Se creó ${dataType} correctamente, pero no se pudo añadir el evento al calendario.`
                            : `Se editó ${dataType} correctamente, pero no se pudo modificar el evento del calendario. `
                    );
                    setAlertType('Error');
                    setAlertVisible(true);
                    onError?.();
                } else if (showSuccesMessage) {
                    setAlertVisible(true);
                    setAlertType('Éxito');
                    setAlertMessage(
                        action === 'add'
                            ? `Se creó ${dataType} correctamente y se añadió al calendario.`
                            : `Se editó ${dataType} correctamente y se actualizó el calendario.`
                    );
                } else {
                    onSuccess(newEventId);
                }
            }, action);
    };

    const CalendarAlerts = () => (
        <StyledAlert
            visible={alertVisible}
            onClose={() => setAlertVisible(false)}
            title={alertType}
            message={alertMessage}
            buttons={[{ text: 'Ok', onPress: () => setAlertVisible(false) }]}
        />
    );

    return { executeCalendarAction, CalendarAlerts, CalendarPermissionModal };
};