export const getYearFromDate = (date: string | undefined): string => {
  if (!date) return "";
  return new Date(date)?.getFullYear().toString();
};
