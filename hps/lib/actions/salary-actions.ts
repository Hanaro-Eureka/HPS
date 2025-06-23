'use server';

import { startOfMonth, endOfMonth } from 'date-fns';
import prisma from '../db';

export const getSalaryWithUserId = async (userId: number) =>
  prisma.salary.findFirst({
    where: { userId }, // 원하는 userId로 바꿔주세요
    orderBy: {
      depositDate: 'desc',
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
