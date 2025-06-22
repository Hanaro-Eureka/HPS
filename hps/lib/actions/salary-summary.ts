import prisma from '../db';

export const getIncomeSourcesByUserId = async (
  userId: number,
  startDate: Date
) =>
  (
    await prisma.salary.groupBy({
      by: ['incomeSource'],
      where: {
        userId,
        depositDate: {
          gte: new Date(startDate),
          lte: new Date(),
        },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'asc' } },
    })
  ).map((item) => ({
    category: item.incomeSource ?? '기타',
    amount: item._sum.amount ?? 0,
  }));
