export const getDateString = (date?: Date | string): string | undefined => {
    if (!date) return undefined;
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toISOString().split('T')[0]; // Formato YYYY-MM-DD
};

export const getTimeString = (date?: Date | string): string | undefined => {
    if (!date) return undefined;
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); // Formato HH:mm
};

export const combineDateAndTime = (date?: Date, time?: Date): Date | undefined => {
    if (!date) return undefined;
    const newDate = new Date(date); // copia para no mutar el original
  
    if (time) {
      newDate.setHours(time.getHours());
      newDate.setMinutes(time.getMinutes());
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
    } else {
      newDate.setHours(0, 0, 0, 0);
    }
  
    return newDate;
  };