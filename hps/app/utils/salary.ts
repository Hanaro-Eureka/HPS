import { getSalariesWithUserId } from '@/lib/actions/salary-actions';

export const getFirstDayOfThisMonth = () => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const firstDayOfThisMonth = new Date(
    `${thisYear}-${thisMonth.toString().padStart(2, '0')}-01T00:00:00`
  );

  return firstDayOfThisMonth;
};

export const getSumOfThisMonthSalaries = async (userId: number) => {
  const firstDayOfThisMonth = getFirstDayOfThisMonth();
  const salariesOfThisMonth = await getSalariesWithUserId(
    userId,
    firstDayOfThisMonth
  );

  const sumOfSalaries = salariesOfThisMonth.reduce(
    (sum, salary) => sum + salary.amount,
    0
  );

  return sumOfSalaries;
};
