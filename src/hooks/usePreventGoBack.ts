import React from 'react';
import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

function usePreventGoBack() {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log('Botón atrás presionado - la navegación está bloqueada.');
        // Aquí puedes agregar lógica adicional si es necesario,
        // como mostrar una alerta al usuario.
        return true; // Bloquea la navegación hacia atrás
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );
}

export default usePreventGoBack;