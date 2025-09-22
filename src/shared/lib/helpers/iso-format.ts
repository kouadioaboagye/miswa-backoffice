import { format } from 'date-fns';

export const isISODate = (value: string) => {
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    return isoDatePattern.test(value);
};

export const formatDateToYYYYMMDDHHMM = (date: string) => {
    const rawDate = new Date(date);
    // if (isNaN(rawDate.getTime())) {
    //     return null; // or some error handling
    // }
    return format(rawDate, 'dd/MM/y HH:mm');
};
