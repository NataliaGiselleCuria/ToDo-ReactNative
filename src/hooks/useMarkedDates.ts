import { useMemo } from "react";
import { CategoriesList, List } from "../types/types";
import moment from "moment";

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

      const start = list.startDate;
      const end = list.endDate ?? list.startDate;
      const startStr = moment(start).format('YYYY-MM-DD');
      const endStr = moment(end).format('YYYY-MM-DD');

      const color = isPeriod ? 'orange' : 'teal';

      let current = moment(start);
      const endMoment = moment(end).add(1, 'day');
      while (current.isBefore(endMoment)) {
        const dateStr = current.format('YYYY-MM-DD');

        if (!marks[dateStr]) marks[dateStr] = { periods: [] };

        marks[dateStr].periods.push({
          startingDay: dateStr === startStr,
          endingDay: dateStr === endStr,
          color,
        });

        current.add(1, 'day');
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