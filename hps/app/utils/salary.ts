import {
  getMonthlySalary,
  getSalariesWithUserId,
} from '@/lib/actions/salary-actions';
import { getStartAndEndOfMonth } from '../spendList/utils/spending';

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

export const getLastIncome = async (userId: number) => {
  const now = new Date();

  // 이번 달
  const thisMonth = getStartAndEndOfMonth(now);

  // 지난 달
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = getStartAndEndOfMonth(lastMonthDate);

  // 두 달치 급여 가져오기
  const [thisMonthSalaryList, lastMonthSalaryList] = await Promise.all([
    getMonthlySalary(userId, thisMonth.start, thisMonth.end),
    getMonthlySalary(userId, lastMonth.start, lastMonth.end),
  ]);

  const allSalaryList = [...thisMonthSalaryList, ...lastMonthSalaryList];

  return allSalaryList;
};
