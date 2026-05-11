/**
 * Date Utility Functions
 * Ported from bappacards-client/src/utils/dateUtils.js
 * Pure functions — no window/browser access needed.
 */

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * Parse a date string in the format "Month Day Year" (e.g., "January 1st 2023")
 */
export const parseDate = (dateString: string | null | undefined): Date | null => {
  if (!dateString) return null;

  const [month, dayWithSuffix, year] = dateString.split(' ');
  const day = dayWithSuffix.replace(/(st|nd|rd|th)/, '');
  const monthIndex = MONTHS.indexOf(month);

  if (monthIndex === -1 || isNaN(parseInt(day)) || isNaN(parseInt(year))) {
    return null;
  }

  return new Date(parseInt(year), monthIndex, parseInt(day));
};

/**
 * Format a Date object to "Month Day Year" format (e.g., "January 1st 2023")
 */
export const formatDate = (date: Date | null | undefined): string => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) return '';

  const day = date.getDate();
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) suffix = 'st';
  else if (day === 2 || day === 22) suffix = 'nd';
  else if (day === 3 || day === 23) suffix = 'rd';

  return `${month} ${day}${suffix} ${year}`;
};
