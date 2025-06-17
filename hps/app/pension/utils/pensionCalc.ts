export const calcPensionDate = async (date: Date) => {
  if (!date || !(date instanceof Date)) {
    throw new Error('유효하지 않은 날짜');
  }
  const start = new Date(date);
  const now = new Date();

  const years = now.getFullYear() - start.getFullYear();
  const months = now.getMonth() - start.getMonth();
  const totalMonths = years * 12 + months;

  return totalMonths;
};
