import { useCallback } from "react";
import { Alert } from "react-native";

interface DateRangeValidationProps {
  minDate?: Date; // fecha mínima permitida (por ejemplo, startDate de la lista)
  maxDate?: Date; // fecha máxima permitida (por ejemplo, endDate de la lista)
}

export const useDateRangeValidation = ({ minDate, maxDate }: DateRangeValidationProps = {}) => {
    const validateStartDate = useCallback((start: Date | undefined, end: Date | undefined) => {
      if (start && end && start > end) {
        Alert.alert(
          "Fecha inválida",
          "La fecha de inicio no puede ser posterior a la fecha de finalización. Se reiniciará la fecha de finalización."
        );
        return { startDate: start, endDate: undefined };
      }
  
      if (minDate && start && start < minDate) {
        Alert.alert(
          "Fecha inválida",
          "La fecha de inicio no puede ser anterior a la fecha de inicio de la lista."
        );
        return { startDate: undefined, endDate: end };
      }
  
      if (maxDate && start && start > maxDate) {
        Alert.alert(
          "Fecha inválida",
          "La fecha de inicio no puede ser posterior a la fecha de fin de la lista."
        );
        return { startDate: undefined, endDate: end };
      }
  
      return { startDate: start, endDate: end };
    }, [minDate, maxDate]);
  
    const validateEndDate = useCallback((start: Date | undefined, end: Date | undefined) => {
        if (start && end && end < start) {
          Alert.alert(
            "Fecha inválida",
            "La fecha límite no puede ser anterior a la fecha de inicio. Se reiniciará."
          );
          return { startDate: start, endDate: undefined };
        }
      
        if (minDate && end && end < minDate) {
          Alert.alert(
            "Fecha inválida",
            "La fecha límite no puede ser anterior a la fecha de inicio de la lista."
          );
          return { startDate: start, endDate: undefined };
        }
      
        if (maxDate && end && end > maxDate) {
          Alert.alert(
            "Fecha inválida",
            "La fecha límite no puede ser posterior a la fecha de fin de la lista."
          );
          return { startDate: start, endDate: undefined };
        }
      
        return { startDate: start, endDate: end };
      }, [minDate, maxDate]);
  
    return {
      validateStartDate,
      validateEndDate,
    };
  };