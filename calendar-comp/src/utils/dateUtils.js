import { startOfWeek, format } from "date-fns";

export const getStartOfWeek = (date) => startOfWeek(date, { weekStartsOn: 0 });
export const formatHour = (date) => format(date, "hh:mm a");
export const formatDay = (date) => format(date, "EEE dd");
export const addHours = (date, hours) => new Date(date.getTime() + hours * 3600 * 1000);
export const addDaysToDate = (date, days) => new Date(date.getTime() + days * 24 * 3600 * 1000);
