import { useState } from 'react';

type AlertType = 'Éxito' | 'Error';

export const useAlert = () => {
   const [visible, setVisible] = useState(false);
   const [message, setMessage] = useState('');
   const [type, setType] = useState<AlertType>('Éxito');

   const showAlert = (msg: string, alertType: AlertType = 'Éxito') => {
      setMessage(msg);
      setType(alertType);
      setVisible(true);
   };

   const hideAlert = () => {
      setVisible(false);
      setMessage('');
   };

   return {
      alertVisible: visible,
      alertMessage: message,
      alertType: type,
      showAlert,
      hideAlert,
   };
};