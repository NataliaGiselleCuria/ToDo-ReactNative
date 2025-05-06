import { useCallback } from "react";
import { Alert } from "react-native";
import { combineDateAndTime } from "../../src/utils/dateUtils";

interface DateRangeValidationProps {
  minDate?: Date; // fecha mínima permitida (por ejemplo, startDate de la lista)
  maxDate?: Date; // fecha máxima permitida (por ejemplo, endDate de la lista)
}

export const useDateRangeValidation = ({ minDate, maxDate }: DateRangeValidationProps = {}) => {

  //Fecha de inicio
  const validateStartDate = useCallback((
    startDate?: Date,
    startTime?: Date,
    endDate?: Date,
    endTime?: Date
  ) => {
    const fullStart = combineDateAndTime(startDate, startTime);
    const fullEnd = combineDateAndTime(endDate, endTime);

    if (fullStart && fullEnd && fullStart > fullEnd) {
      Alert.alert(
        "Fecha inválida",
        "La fecha de inicio no puede ser posterior a la de finalización. Se reiniciará la fecha de finalización."
      );
      return { startDate, startTime, endDate: undefined, endTime: undefined };
    }

    if (minDate && fullStart && fullStart < minDate) {
      Alert.alert("Fecha inválida", "La fecha de inicio no puede ser anterior a la fecha mínima permitida.");
      return { startDate: undefined, startTime: undefined, endDate, endTime };
    }

    if (maxDate && fullStart && fullStart > maxDate) {
      Alert.alert("Fecha inválida", "La fecha de inicio no puede ser posterior a la fecha máxima permitida.");
      return { startDate: undefined, startTime: undefined, endDate, endTime };
    }

    return { startDate, startTime, endDate, endTime };
  }, [minDate, maxDate]);


  //Fecha de finalización
  const validateEndDate = useCallback((
    startDate?: Date,
    startTime?: Date,
    endDate?: Date,
    endTime?: Date
  ) => {
    const fullStart = combineDateAndTime(startDate, startTime);

    // 1. Validación de rango sin hora (solo fecha)
    if (startDate && endDate && !endTime) {
      const justStartDate = new Date(startDate.toDateString());
      const justEndDate = new Date(endDate.toDateString());
  
      if (justEndDate < justStartDate) {
        Alert.alert(
          "Fecha inválida",
          "La fecha de fin no puede ser anterior a la fecha de inicio. Se reiniciará."
        );
        return { startDate, startTime, endDate: undefined, endTime: undefined };
      }
      return { startDate, startTime, endDate, endTime }; // Si solo hay fechas y es válida, retornamos
    }

    // 2. Validación de fecha y hora completas
    const fullEnd = endTime ? combineDateAndTime(endDate, endTime) : undefined;

    if (fullStart && fullEnd && fullEnd < fullStart) {
      Alert.alert(
        "Fecha inválida",
        "La fecha límite no puede ser anterior a la de inicio. Se reiniciará."
      );
      return { startDate, startTime, endDate: undefined, endTime: undefined };
    }

    // 3. Rango mínimo y máximo
    if (minDate && fullEnd && fullEnd < minDate) {
      Alert.alert("Fecha inválida", "La fecha límite no puede ser anterior a la fecha mínima permitida.");
      return { startDate, startTime, endDate: undefined, endTime: undefined };
    }

    if (maxDate && fullEnd && fullEnd > maxDate) {
      Alert.alert("Fecha inválida", "La fecha límite no puede ser posterior a la fecha máxima permitida.");
      return { startDate, startTime, endDate: undefined, endTime: undefined };
    }

    return { startDate, startTime, endDate, endTime };
  }, [minDate, maxDate]);

  return {
    validateStartDate,
    validateEndDate,
  };
};