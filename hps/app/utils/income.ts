import {
  getIncomesWithUserId,
  getMonthlyIncomeWithUserId,
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

  // 이번 년도
  const thisYear = now.getFullYear().toString();
  // 이번 달
  const thisMonth = (now.getMonth() + 1).toString();
  const thisYearMonth = `${thisYear}-${thisMonth.padStart(2, '0')}`;

  // 지난 달
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = (lastMonthDate.getMonth() + 1).toString();
  const lastYearMonth = `${thisYear}-${lastMonth.padStart(2, '0')}`;

  // 두 달치 급여 가져오기
  const [thisMonthIncomeList, lastMonthIncomeList] = await Promise.all([
    getMonthlyIncomeWithUserId(userId, thisYearMonth),
    getMonthlyIncomeWithUserId(userId, lastYearMonth),
  ]);

  const allIncomeList = [...thisMonthIncomeList, ...lastMonthIncomeList];

  return allIncomeList;
};
