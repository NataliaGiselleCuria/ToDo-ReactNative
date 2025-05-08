import { useState } from "react";

export function useDatesSchedule(
    initial: {
        startDate?: Date;
        startTime?: Date;
        endDate?: Date;
        endTime?: Date;
        minDate?: Date;
        maxDate?: Date;
    },
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

    const [startDate, setStartDate] = useState(initial.startDate);
    const [startTime, setStartTime] = useState(initial.startTime);
    const [endDate, setEndDate] = useState(initial.endDate);
    const [endTime, setEndTime] = useState(initial.endTime);

    const [scheduleStartDate, setScheduleStartDate] = useState(!!initial.startDate);
    const [scheduleStartTime, setScheduleStartTime] = useState(!!initial.startTime);
    const [scheduleEndDate, setScheduleEndDate] = useState(!!initial.endDate);
    const [scheduleEndTime, setScheduleEndTime] = useState(!!initial.endTime);

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
                newEndTime,
               
            );
            setStartDate(validatedResult?.startDate);
            setStartTime(validatedResult?.startTime);
        } else if (type === 'endDate' || type === 'endTime') {
            validatedResult = validateEndDateFn(
                newStartDate,
                newStartTime,
                newEndDate,
                newEndTime,
               
            );
            setEndDate(validatedResult?.endDate);
            setEndTime(validatedResult?.endTime);
        }

        setScheduleStartDate(!!validatedResult?.startDate);
        setScheduleStartTime(!!validatedResult?.startTime);
        setScheduleEndDate(!!validatedResult?.endDate);
        setScheduleEndTime(!!validatedResult?.endTime);
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