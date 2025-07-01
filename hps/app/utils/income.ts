import { getStartAndEndOfMonth } from '@/utils/spending';
import {
  getMonthlyIncome,
  getIncomesWithUserId,
} from '@/lib/actions/income-actions';

export const getFirstDayOfThisMonth = () => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const firstDayOfThisMonth = new Date(
    `${thisYear}-${thisMonth.toString().padStart(2, '0')}-01T00:00:00`
  );

  return firstDayOfThisMonth;
};

export const getSumOfThisMonthIncomes = async (userId: number) => {
  const firstDayOfThisMonth = getFirstDayOfThisMonth();
  const incomesOfThisMonth = await getIncomesWithUserId(
    userId,
    firstDayOfThisMonth
  );

  const sumOfIncomes = incomesOfThisMonth.reduce(
    (sum, income) => sum + income.amount,
    0
  );

  return sumOfIncomes;
};

export const getLastIncome = async (userId: number) => {
  const now = new Date();

  // 이번 달
  const thisMonth = getStartAndEndOfMonth(now);

  // 지난 달
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = getStartAndEndOfMonth(lastMonthDate);

  // 두 달치 급여 가져오기
  const [thisMonthIncomeList, lastMonthIncomeList] = await Promise.all([
    getMonthlyIncome(userId, thisMonth.start, thisMonth.end),
    getMonthlyIncome(userId, lastMonth.start, lastMonth.end),
  ]);

  const allIncomeList = [...thisMonthIncomeList, ...lastMonthIncomeList];

  return allIncomeList;
};
