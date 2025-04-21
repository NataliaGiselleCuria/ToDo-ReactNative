import { useMemo } from "react";
import { CategoriesList, List } from "../types/types";

export type FilterOptions = {
    category?: CategoriesList;
    sharedOnly?: boolean;
};

export const useMarkedDates = (
    lists: List[],
    selectedDay: string,
    filters: FilterOptions
) => {
    return useMemo(() => {
        const marks: { [date: string]: any } = {};

        const filtered = lists.filter(list => {
            if (filters.category && list.category !== filters.category) return false;
            if (filters.sharedOnly && list.participants.length <= 1) return false;
            return true;
        });

        filtered.forEach((list) => {
            const isPeriod = Boolean(list.endDate);
      
            const start = new Date(list.startDate);
            const end = list.endDate ? new Date(list.endDate) : new Date(list.startDate);
            const startStr = start.toISOString().split('T')[0];
            const endStr = end.toISOString().split('T')[0];
      
            const color = isPeriod ? 'orange' : 'teal';
      
            for (
              let date = new Date(start);
              date <= end;
              date.setDate(date.getDate() + 1)
            ) {
              const dateStr = date.toISOString().split('T')[0];
              if (!marks[dateStr]) marks[dateStr] = { periods: [] };
      
              marks[dateStr].periods.push({
                startingDay: dateStr === startStr,
                endingDay: dateStr === endStr,
                color,
              });
            }
          });

        marks[selectedDay] = {
            ...(marks[selectedDay] || {}),
            selected: true,
            selectedColor: '#4CAF50',
        };

        return marks;
    }, [lists, selectedDay, filters]);
};