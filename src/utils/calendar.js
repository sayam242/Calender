import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday, format, isSameDay, isWithinInterval, isBefore, isAfter } from 'date-fns';

export const getCalendarDays = (currentDate) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  return eachDayOfInterval({ start: startDate, end: endDate });
};

export const checkIsSameMonth = (date, currentMonth) => isSameMonth(date, currentMonth);
export const checkIsToday = (date) => isToday(date);
export const formatDate = (date, formatStr) => format(date, formatStr);

// --- NEW RANGE LOGIC ---
export const checkIsSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  return isSameDay(date1, date2);
};

export const checkIsWithinRange = (date, start, end) => {
  if (!date || !start || !end) return false;
  // Ensure we pass the dates to date-fns in the correct chronological order
  const safeStart = isBefore(start, end) ? start : end;
  const safeEnd = isAfter(end, start) ? end : start;
  return isWithinInterval(date, { start: safeStart, end: safeEnd });
};

export const checkIsBefore = (date1, date2) => isBefore(date1, date2);