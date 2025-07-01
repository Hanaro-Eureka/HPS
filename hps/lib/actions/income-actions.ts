'use server';

import { toUtcFromSeoul } from '@/utils/time';
import { startOfMonth, endOfMonth } from 'date-fns';
import prisma from '../db';

export const getIncomesWithUserId = async (userId: number, startDate: Date) => {
  const now = new Date();
  const utcTime = toUtcFromSeoul(now.toISOString());
  return prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: new Date(startDate),
        lte: utcTime,
      },
    },
  });
};

export const getLatestSixMonthIncomesWithUserId = async (userId: number) =>
  await prisma.$queryRaw<{ yearMonth: string; totalIncome: number }[]>`
  SELECT
    DATE_FORMAT(depositDate, '%Y-%m') AS yearMonth,
    SUM(amount) AS totalIncome
  FROM income
  WHERE depositDate BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01')
                      AND NOW() and userId = ${userId}
  GROUP BY yearMonth
  ORDER BY yearMonth desc;
`;

export const getLastYearSixMonthIncomesWithUserId = async (userId: number) =>
  await prisma.$queryRaw<{ yearMonth: string; totalIncome: number }[]>`
  SELECT
    DATE_FORMAT(depositDate, '%Y-%m') AS yearMonth,
    SUM(amount) AS totalIncome
  FROM income
  WHERE depositDate BETWEEN DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 17 MONTH)
                      AND LAST_DAY(DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 12 MONTH)) and userId = ${userId}
  GROUP BY yearMonth
  ORDER BY yearMonth desc;
`;

export const getThisYearIncome = async (
  userId: number,
  startOfYear: Date,
  endOfYear: Date
) =>
  prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: startOfYear,
        lte: endOfYear,
      },
    },
  });

export const getMonthlyIncome = async (
  userId: number,
  startOfMonth: Date,
  endOfMonth: Date
) =>
  prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });
export const getMonthlyIncomeWithUserId = async (
  userId: number,
  yearMonth: string
) => {
  const date = new Date(`${yearMonth}-01T00:00:00Z`);
  const incomeList = await prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: startOfMonth(date),
        lte: endOfMonth(date),
      },
    },
  });

  return incomeList;
};

export const updateIncome = async (formdate: FormData) => {
  const id = Number(formdate.get('id'));
  const incomeSource = formdate.get('value')?.toString();

  await prisma.income.update({
    where: { id },
    data: { incomeSource: incomeSource },
  });
};

export const getIncomeChangeFromLastMonth = async (
  userId: number,
  yearMonth: string
) => {
  const [year, month] = yearMonth.split('-').map(Number);
  const thisMonthStart = new Date(year, month - 1, 1);
  const thisMonthEnd = new Date(year, month, 0, 23, 59, 59, 999);

  const lastMonthStart = new Date(year, month - 2, 1);
  const lastMonthEnd = new Date(year, month - 1, 0, 23, 59, 59, 999);

  const [thisMonthData, lastMonthData] = await Promise.all([
    prisma.income.findMany({
      where: {
        userId,
        depositDate: { gte: thisMonthStart, lte: thisMonthEnd },
      },
    }),
    prisma.income.findMany({
      where: {
        userId,
        depositDate: { gte: lastMonthStart, lte: lastMonthEnd },
      },
    }),
  ]);

  const sumBySource = (data: typeof thisMonthData) =>
    data.reduce<Record<string, number>>((acc, cur) => {
      const source = cur.incomeSource ?? cur.depositorName ?? '기타';
      acc[source] = (acc[source] || 0) + cur.amount;
      return acc;
    }, {});

  const thisSum = sumBySource(thisMonthData);
  const lastSum = sumBySource(lastMonthData);

  const result: Record<
    string,
    { thisMonth: number; lastMonth: number; diff: number }
  > = {};

  Object.keys(thisSum).forEach((source) => {
    result[source] = {
      thisMonth: thisSum[source],
      lastMonth: lastSum[source] ?? 0,
      diff: thisSum[source] - (lastSum[source] ?? 0),
    };
  });

  return result;
};

//특정 기간의 급여 합 함수.
export const getIncomeSumByPeriod = async (
  userId: number,
  startDate: Date,
  endDate: Date
) => {
  const incomes = await prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: startDate,
        lte: endDate,
      },
    },
    select: { amount: true },
  });

  return incomes.reduce((sum, s) => sum + s.amount, 0);
};

// 지난 달 입금 합
export const getLastMonthIncomeSum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  return getIncomeSumByPeriod(userId, start, end);
};

// 직전 3개월 수입 합 (3, 4, 5월 등)
export const getRecent3MonthsIncomeSum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  return getIncomeSumByPeriod(userId, start, end);
};

// 직전 6개월 수입 합
export const getRecent6MonthsIncomeSum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 6, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  return getIncomeSumByPeriod(userId, start, end);
};

// 이번 달 1일부터 오늘까지 수입 합
export const getThisMonthUntilTodayIncomeSum = async (userId: number) => {
  const now = new Date();
  const utcTime = toUtcFromSeoul(now.toISOString());
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return getIncomeSumByPeriod(userId, start, utcTime);
};

// 작년 동일 월 수입 합 (지금이 6월이면 2024년 6월)
export const getLastYearSameMonthIncomeSum = async (userId: number) => {
  const now = new Date();
  const year = now.getFullYear() - 1;
  const month = now.getMonth(); // 0-indexed
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return getIncomeSumByPeriod(userId, start, end);
};

// 작년 동일 분기 수입 합 (지금이 6월이면 3~5월)
export const getLastYearSamePeriodIncomeSum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear() - 1, now.getMonth() - 3, 1);
  const end = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  );
  return getIncomeSumByPeriod(userId, start, end);
};

// 작년 다음 달 수입 합 (지금이 6월이면 작년 7월)
export const getLastYearNextMonthIncomeSum = async (userId: number) => {
  const now = new Date();
  const year = now.getFullYear() - 1;
  const targetMonth = now.getMonth() + 1;
  const start = new Date(year, targetMonth, 1);
  const end = new Date(year, targetMonth + 1, 0, 23, 59, 59, 999);
  return getIncomeSumByPeriod(userId, start, end);
};

export async function getPredictedNextMonthIncome(
  userId: number
): Promise<number> {
  const [lastYearNextMonthSum, recent3MonthsSum, lastYear3MonthsSum] =
    await Promise.all([
      getLastYearNextMonthIncomeSum(userId),
      getRecent3MonthsIncomeSum(userId),
      getLastYearSamePeriodIncomeSum(userId),
    ]);

  const growthRate = recent3MonthsSum / lastYear3MonthsSum || 1;
  return lastYearNextMonthSum * growthRate;
}
