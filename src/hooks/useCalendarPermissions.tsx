import { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { addToSystemCalendar } from '../utils/calendarUtils';

export const useCalendarPermission = (listData: any) => {
  const [permissionShowModal, setPermissionShowModal] = useState(false);
  const [onFinish, setOnFinish] = useState<() => void>(() => () => {});

  const openPermissionModal = (callback: () => void) => {
    setOnFinish(() => callback);
    setPermissionShowModal(true);
  };

  const confirmAddToCalendar = async () => {
    try {
      if (listData?.startDate) {
        await addToSystemCalendar(`${listData.name} (Inicio)`, listData.startDate);
      }
      if (listData?.endDate) {
        await addToSystemCalendar(`${listData.name} (Fin)`, listData.endDate);
      }
    } catch (err) {
      console.warn('No se pudo agregar al calendario', err);
    }
  };

  const handlePermissions = async (shouldAdd: boolean) => {
    setPermissionShowModal(false);

    if (shouldAdd) {
      await confirmAddToCalendar();
    }

    onFinish?.();
  };

  const CalendarPermissionModal = () => (
    <Modal visible={permissionShowModal} transparent animationType="fade">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000088' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 10 }}>
          <Text>¿Querés agregar esta lista al calendario del sistema?</Text>
          <Button title="Sí, agregar" onPress={() => handlePermissions(true)} />
          <Button title="No" onPress={() => handlePermissions(false)} />
        </View>
      </View>
    </Modal>
  );

  return {
    openPermissionModal,
    CalendarPermissionModal,
  };
};