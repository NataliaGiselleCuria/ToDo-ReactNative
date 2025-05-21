import { useCallback } from "react";
import { Alert } from "react-native";
import { combineDateAndTime } from "../../utils/dateUtils";

interface DateRangeValidationProps {
   minDate?: Date; // fecha mínima permitida (por ejemplo, startDate de la lista)
   maxDate?: Date; // fecha máxima permitida (por ejemplo, endDate de la lista)
   isItem?: boolean;
}

export const useDateRangeValidation = ({ minDate, maxDate, isItem = false }: DateRangeValidationProps = {}) => {


   //Fecha de inicio
   const validateStartDate = useCallback((
      startDate?: Date,
      startTime?: Date,
      endDate?: Date,
      endTime?: Date,
   ) => {

      const fullStart = combineDateAndTime(startDate, startTime);
      const fullEnd = combineDateAndTime(endDate, endTime);

      if (!fullStart) {
         return { startDate, startTime, endDate, endTime };
      }

      if (fullEnd && fullStart > fullEnd) {
         Alert.alert(
            "Fecha inválida",
            "La fecha de inicio no puede ser posterior a la de finalización. Se reiniciará la fecha de finalización."
         );
         return { startDate, startTime, endDate: undefined, endTime: undefined };
      }

      if (minDate) {
         if (isItem) {
            if (!startTime) {  //1. sin hora

               const justStart = new Date(fullStart.toDateString());
               const justMin = new Date(minDate.toDateString());
               if (justStart < justMin) {
                  Alert.alert("Fecha inválida", "La fecha de inicio no puede ser anterior a la fecha mínima permitida.");
                  return { startDate: undefined, startTime: undefined, endDate, endTime };

               }
            } else if (fullStart < minDate) { // 2. fecha completa

               Alert.alert("Fecha inválida", "La fecha de inicio no puede ser anterior a la fecha mínima permitida.");
               return { startDate: undefined, startTime: undefined, endDate, endTime };
            }
         }
      }

      if (maxDate) {
         if (isItem) {
            if (fullStart > maxDate) {
               Alert.alert("Fecha inválida", "La fecha de inicio no puede ser posterior a la fecha máxima permitida.");
               return { startDate: undefined, startTime: undefined, endDate, endTime };
            }
         } else {
            const justStart = new Date(fullStart.toDateString());
            const justMax = new Date(maxDate.toDateString());
            if (justStart > justMax) {
               Alert.alert("Fecha inválida", "La fecha de inicio no puede ser posterior a la fecha máxima permitida.");
               return { startDate: undefined, startTime: undefined, endDate, endTime };
            }
         }
      }

      return { startDate, startTime, endDate, endTime };
   }, [minDate, maxDate]);


   //Fecha de finalización
   const validateEndDate = useCallback((
      startDate?: Date,
      startTime?: Date,
      endDate?: Date,
      endTime?: Date,
   ) => {

      const fullStart = combineDateAndTime(startDate, startTime);
      const fullEnd = endTime ? combineDateAndTime(endDate, endTime) : undefined;
      const now = new Date();
      const nowDate = new Date(now.toDateString());

      // 1. Si no hay fecha de inicio, endDate no puede ser anterior al presente
      if (!fullStart) {
         if (!fullEnd && endDate && endDate < nowDate) {
            Alert.alert(" 1.a Fecha inválida", "La fecha de finalización no puede ser anterior a la fecha actual.");
            return { startDate, startTime, endDate: undefined, endTime: undefined };

         } else if (fullEnd && fullEnd < now) {
            Alert.alert("1.b Fecha inválida", "La fecha de finalización no puede ser anterior a la fecha actual.");
            return { startDate, startTime, endDate: undefined, endTime: undefined };
         }
      }

      // 2. Si hay fecha y hora de inicio, fin no puede ser anterior
      if (fullStart && fullEnd && fullEnd < fullStart) {
         Alert.alert("2. Fecha inválida", "La fecha de finalización no puede ser anterior a la de inicio.");
         return { startDate, startTime, endDate, endTime: undefined };
      }

      // 3. Si hay solo fecha (sin hora)
      if (startDate && endDate && !endTime) {
         const justStart = new Date(startDate.toDateString());
         const justEnd = new Date(endDate.toDateString());

         if (justEnd < justStart) {
            Alert.alert("3. Fecha inválida", "La fecha de finalización no puede ser anterior a la de inicio.");
            return { startDate, startTime, endDate: undefined, endTime: undefined };
         }
      }

      // 4. Rango mínimo y máximo solo si es un ítem
      if (isItem) {
         if (fullEnd && minDate && fullEnd < minDate) {
            Alert.alert("4.a Fecha inválida", "La fecha de finalización no puede ser anterior a la fecha mínima permitida.");
            return { startDate, startTime, endDate: undefined, endTime: undefined };
         }

         if (fullEnd && maxDate && fullEnd > maxDate) {
            Alert.alert("4.b Fecha inválida", "La fecha de finalización no puede ser posterior a la fecha máxima permitida.");
            return { startDate, startTime, endDate: undefined, endTime: undefined };
         }
      }

      return { startDate, startTime, endDate, endTime };
   }, [minDate, maxDate, isItem]);

   return {
      validateStartDate,
      validateEndDate,
   };
};


