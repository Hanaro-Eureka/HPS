'use server';

import { startOfMonth, endOfMonth } from 'date-fns';
import prisma from '../db';

export const getSalariesWithUserId = async (userId: number, startDate: Date) =>
  prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: new Date(startDate),
        lte: new Date(),
      },
    },
  });

export const getLatestSixMonthSalariesWithUserId = async (userId: number) =>
  await prisma.$queryRaw<{ yearMonth: string; totalSalary: number }[]>`
  SELECT
    DATE_FORMAT(depositDate, '%Y-%m') AS yearMonth,
    SUM(amount) AS totalSalary
  FROM salary
  WHERE depositDate BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01')
                      AND NOW() and userId = ${userId}
  GROUP BY yearMonth
  ORDER BY yearMonth desc;
`;

export const getLastYearSixMonthSalariesWithUserId = async (userId: number) =>
  await prisma.$queryRaw<{ yearMonth: string; totalSalary: number }[]>`
  SELECT
    DATE_FORMAT(depositDate, '%Y-%m') AS yearMonth,
    SUM(amount) AS totalSalary
  FROM salary
  WHERE depositDate BETWEEN DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 17 MONTH)
                      AND LAST_DAY(DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 12 MONTH)) and userId = ${userId}
  GROUP BY yearMonth
  ORDER BY yearMonth desc;
`;

export const getThisYearSalary = async (
  userId: number,
  startOfYear: Date,
  endOfYear: Date
) =>
  prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: startOfYear,
        lte: endOfYear,
      },
    },
  });

export const getMonthlySalary = async (
  userId: number,
  startOfMonth: Date,
  endOfMonth: Date
) =>
  prisma.salary.findMany({
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
  const salaryList = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: startOfMonth(date),
        lte: endOfMonth(date),
      },
    },
  });

  return salaryList;
};

export const updateIncome = async (formdate: FormData) => {
  const id = Number(formdate.get('id'));
  const incomeSource = formdate.get('value')?.toString();

  await prisma.salary.update({
    where: { id },
    data: { incomeSource: incomeSource },
  });
};

export const getSalaryChangeFromLastMonth = async (
  userId: number,
  yearMonth: string
) => {
  const [year, month] = yearMonth.split('-').map(Number);
  const thisMonthStart = new Date(year, month - 1, 1);
  const thisMonthEnd = new Date(year, month, 0, 23, 59, 59, 999);

  const lastMonthStart = new Date(year, month - 2, 1);
  const lastMonthEnd = new Date(year, month - 1, 0, 23, 59, 59, 999);

  const [thisMonthData, lastMonthData] = await Promise.all([
    prisma.salary.findMany({
      where: {
        userId,
        depositDate: { gte: thisMonthStart, lte: thisMonthEnd },
      },
    }),
    prisma.salary.findMany({
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

// 지난 달 입금 합 구하자. (지금이 6월 n일이라면 5월 입금 합.)
export const getLastMonthSalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1); // 지난 달 1일
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999); // 지난 달 말일

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};

// 직전 1개월,2개월,3개월 수입 합! (지금이 6월 n일이라면 3,4,5월 입금 합)
export const getRecent3MonthsSalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 3, 1); // 3개월 전 1일 (3월 1일)
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999); // 지난 달 말일 (5월 31일)

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};

// 동일 13개월 전, 14개월 전, 15개월 전 수입의 합
// (지금이 2025년 6월이라면 2024년 3,4,5월 입금 합)
export const getLastYearSamePeriodSalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear() - 1, now.getMonth() - 3, 1); // 작년 3월 1일
  const end = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  ); // 작년 5월 31일

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};

// 11개월 전 달 월급. (지금이 2025년 6월이라면 2024년 7월 입금 합.)
export const getLastYearNextMonthSalarySum = async (userId: number) => {
  const now = new Date();
  const year = now.getFullYear() - 1;
  const targetMonth = now.getMonth() + 1; // 다음 달 (0-indexed)

  const start = new Date(year, targetMonth, 1); // ex: 2024-07-01
  const end = new Date(year, targetMonth + 1, 0, 23, 59, 59, 999); // 2024-07-31

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};
// 직전 1개월,2개월,3개월 수입 합! (지금이 6월 n일이라면 3,4,5월 입금 합)
export const getRecent6MonthsSalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 6, 1); // 3개월 전 1일 (3월 1일)
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999); // 지난 달 말일 (5월 31일)

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};

// 이번 달 1일부터 오늘까지의 입금 합계
export const getThisMonthUntilTodaySalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: now,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};

// 작년 이번달 급여 합 구하기 (지금이 25년 6월이면 2024년 6월 합산)
export const getLastYearSameMonthSalarySum = async (userId: number) => {
  const now = new Date();
  const lastYear = now.getFullYear() - 1;
  const month = now.getMonth();

  const start = new Date(lastYear, month, 1);
  const end = new Date(lastYear, month + 1, 0, 23, 59, 59, 999);

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};
