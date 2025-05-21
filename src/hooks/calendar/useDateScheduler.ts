import { useEffect, useState } from "react";

interface InitialDates {
    startDate?: Date | null;
    startTime?: Date | null;
    endDate?: Date | null;
    endTime?: Date | null;
    scheduleStartDate?: boolean;
    scheduleStartTime?: boolean;
    scheduleEndDate?: boolean;
    scheduleEndTime?: boolean;
}

export function useDatesSchedule(
    initial: InitialDates = {},
    validateStartDateFn: (
        startDate?: Date,
        startTime?: Date,
        endDate?: Date,
        endTime?: Date
    ) => { startDate?: Date; startTime?: Date; endDate?: Date; endTime?: Date },
    validateEndDateFn: (
        startDate?: Date,
        startTime?: Date,
        endDate?: Date,
        endTime?: Date
    ) => { startDate?: Date; startTime?: Date; endDate?: Date; endTime?: Date },

) {

    const [startDate, setStartDate] = useState<Date | undefined>(initial.startDate || undefined);
    const [startTime, setStartTime] = useState<Date | undefined>(initial.startTime || undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(initial.endDate || undefined);
    const [endTime, setEndTime] = useState<Date | undefined>(initial.endTime || undefined);


    const [scheduleStartDate, setScheduleStartDate] = useState(initial.scheduleStartDate ?? false);
    const [scheduleStartTime, setScheduleStartTime] = useState(initial.scheduleStartTime ?? false);
    const [scheduleEndDate, setScheduleEndDate] = useState(initial.scheduleEndDate ?? false);
    const [scheduleEndTime, setScheduleEndTime] = useState(initial.scheduleEndTime ?? false);

    const handleDateChange = (
        type: 'startDate' | 'startTime' | 'endDate' | 'endTime',
        value: Date | undefined,
        validate: typeof validateStartDateFn | typeof validateEndDateFn
    ) => {
        const newStartDate = type === 'startDate' ? value : startDate;
        const newStartTime = type === 'startTime' ? value : startTime;
        const newEndDate = type === 'endDate' ? value : endDate;
        const newEndTime = type === 'endTime' ? value : endTime;

        let validatedResult;

        if (type === 'startDate' || type === 'startTime') {
            validatedResult = validateStartDateFn(
                newStartDate,
                newStartTime,
                newEndDate,
                newEndTime
            );
            setStartDate(validatedResult?.startDate || undefined);
            setStartTime(validatedResult?.startTime || undefined);
        } else if (type === 'endDate' || type === 'endTime') {
            validatedResult = validateEndDateFn(
                newStartDate,
                newStartTime,
                newEndDate,
                newEndTime
            );
            setEndDate(validatedResult?.endDate || undefined);
            setEndTime(validatedResult?.endTime || undefined);
        }

        if (type === 'startDate') setScheduleStartDate(!!value);
        if (type === 'startTime') setScheduleStartTime(!!value);
        if (type === 'endDate') setScheduleEndDate(!!value);
        if (type === 'endTime') setScheduleEndTime(!!value);




    };

    return {
        startDate, setStartDate,
        startTime, setStartTime,
        endDate, setEndDate,
        endTime, setEndTime,
        scheduleStartDate,
        scheduleStartTime,
        scheduleEndDate,
        scheduleEndTime,
        setScheduleEndTime,
        handleDateChange
    };
}