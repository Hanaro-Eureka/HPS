import prisma from '../db';

export const createUselessSpendingMany = async (
  userId: number,
  data: { category: string; amount: number }[]
) => {
  return prisma.uselessSpend.createMany({
    data: data.map((item) => ({
      userId,
      category: item.category,
      amount: item.amount,
    })),
  });
};

export const getUselessSpendingByUserId = async (userId: number) => {
  return prisma.uselessSpend.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
};

export const getUselessSpendingThisMonth = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  return prisma.uselessSpend.findMany({
    where: {
      userId,
      createdAt: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { createdAt: 'desc' },
  });
};
