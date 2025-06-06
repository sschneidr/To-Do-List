export function GetDate(date) {
  if (date !== null) return new Date(date);
  return null;
}

export function GetFormattedDate(date) {
  if (date !== null) return date.toISOString().split("T")[0];
  return "";
}

export function GetDurationBetweenDates(date) {
  const currentDate = new Date();

  const duration = parseInt((date - currentDate) / (24 * 60 * 60 * 1000));

  if (duration >= 30) return 30;
  else return duration;
}
