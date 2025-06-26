import { toUtcFromSeoul } from '@/utils/time';
import prisma from '../db';

export const getIncomeSourcesByUserId = async (
  userId: number,
  startDate: Date
) => {
  const now = new Date();
  const utcTime = toUtcFromSeoul(now.toISOString());

  return (
    await prisma.salary.groupBy({
      by: ['incomeSource', 'depositorName'],
      where: {
        userId,
        depositDate: {
          gte: new Date(startDate),
          lte: utcTime,
        },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'asc' } },
    })
  ).map((item) => ({
    category: item.incomeSource ?? item.depositorName,
    amount: item._sum.amount ?? 0,
  }));
};
