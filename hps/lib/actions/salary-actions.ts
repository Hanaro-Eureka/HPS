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
