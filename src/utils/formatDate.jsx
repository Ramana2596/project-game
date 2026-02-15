/*

// utils/formatDate.jsx
export const formatDate = (date, locale = 'en-US') => {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date)).replace(/  /g, '');
};

*/

// utils/formatDate.jsx
export const formatDate = (date, locale = 'en-US') => {
  if (!date) return ""; //handle null or undefined safely

  // Case 1: already formatted as MMM-yyyy (like "Apr-2025")
  if (/^[A-Za-z]{3}-\d{4}$/.test(date)) {
    return date;
  }

  // Case 2: valid date string or object → format as dd-MMM-yyyy
  try {
    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
      .format(new Date(date))
      .replace(/  /g, '');
  } catch {
    return date; // fallback if parsing fails
  }
};
