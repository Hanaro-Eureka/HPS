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
