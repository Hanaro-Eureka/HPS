import prisma from '../db';

// 주요 수입원 다건 저장
export const createIncomeSources = async (
  userId: number,
  data: { depositorName: string; amount: number; depositDate: Date }[]
) => {
  return prisma.income.createMany({
    data: data.map((item) => ({
      userId,
      depositorName: item.depositorName,
      amount: item.amount,
      depositDate: item.depositDate,
    })),
  });
};

// 사용자별 전체 주요 수입 내역 조회
export const getIncomeByUserId = async (userId: number) => {
  return prisma.income.findMany({
    where: { userId },
    orderBy: { depositDate: 'desc' },
  });
};

// 해당 월 수입만 조회
export const getMonthlyIncomeWithUserId = async (
  userId: number,
  yearMonth: string
) => {
  const date = new Date(`${yearMonth}-01T00:00:00Z`);
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );

  return prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
  });
};

// 수입원 삭제
export const removeIncomeSources = async (
  userId: number,
  data: { depositorName: string; amount: number; depositDate: Date }[]
) => {
  for (const item of data) {
    await prisma.income.deleteMany({
      where: {
        userId,
        amount: item.amount,
        depositDate: item.depositDate,
        depositorName: item.depositorName,
      },
    });
  }
};
