import prisma from '../db';

export const getSalaryWithUserId = async (userId: number) =>
  prisma.salary.findMany({
    where: { userId }, // 원하는 userId로 바꿔주세요
    orderBy: {
      depositDate: 'desc',
    },
  });

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
