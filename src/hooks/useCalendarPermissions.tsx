import { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';
import { addToSystemCalendar } from '../utils/calendarUtils';
import { useTheme } from '../context/ThemeContext';
import { globalStyles } from '../styles/globalStyles';

export const useCalendarPermission = (listData: any) => {
  const { theme, incrementModalCount, decrementModalCount } = useTheme();
  const gStyles = globalStyles(theme);
  const [permissionShowModal, setPermissionShowModal] = useState(false);
  const [onFinish, setOnFinish] = useState<() => void>(() => () => { });

  const openPermissionModal = (callback: () => void) => {
    setOnFinish(() => callback);
    setPermissionShowModal(true);
    incrementModalCount()
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
    decrementModalCount()

    if (shouldAdd) {
      await confirmAddToCalendar();
    }

    onFinish?.();
  };

  const CalendarPermissionModal = () => (
      <Modal visible={permissionShowModal} transparent animationType="fade">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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