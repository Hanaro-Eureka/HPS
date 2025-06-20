import prisma from '../db';

// 주요 수입원 다건 저장
export const createIncomeSources = async (
  userId: number,
  data: { depositorName: string; amount: number; depositDate: Date }[]
) => {
  return prisma.salary.createMany({
    data: data.map((item) => ({
      userId,
      depositorName: item.depositorName,
      amount: item.amount,
      depositDate: item.depositDate,
    })),
  });
};

// 사용자별 전체 주요 수입 내역 조회
export const getSalaryByUserId = async (userId: number) => {
  return prisma.salary.findMany({
    where: { userId },
    orderBy: { depositDate: 'desc' },
  });
};

// 이번 년도 주요 수입 내역 조회
export const getSalaryThisYear = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59);

  return prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    orderBy: { depositDate: 'desc' },
  });
};
