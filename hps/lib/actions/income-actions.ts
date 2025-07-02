'use server';

import { toUtcFromSeoul } from '@/utils/time';
import { startOfMonth, endOfMonth } from 'date-fns';
import prisma from '../db';
import { getLastYearSamePeriodIncomeSum } from '../income';

// 해당 userId를 가진 유저의 지정된 날짜로부터 현재까지의 수입원 내역 조회
export const getIncomesWithUserId = async (userId: number, startDate: Date) => {
  const now = new Date();
  const utcTime = toUtcFromSeoul(now.toISOString());
  return prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: new Date(startDate),
        lte: utcTime,
      },
    },
  });
};

// 6개월 치 수입액 총합 조회
// monthAgo :  6개월 치 수입 총합을 구할 현재로부터 과거로 돌아갈 개월 수
export const getSixMonthIncomesWithUserId = async (
  userId: number,
  monthsAgo: number
) => {
  const end = monthsAgo - 5 < 0 ? 'NOW()' : (monthsAgo - 5).toString();
  return await prisma.$queryRaw<{ yearMonth: string; totalIncome: number }[]>`
  SELECT
    DATE_FORMAT(depositDate, '%Y-%m') AS yearMonth,
    SUM(amount) AS totalIncome
  FROM income
  WHERE depositDate BETWEEN DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL ${monthsAgo} MONTH), '%Y-%m-01')
                      AND LAST_DAY(DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL ${end} MONTH))  and userId = ${userId}
  GROUP BY yearMonth
  ORDER BY yearMonth desc;
`;
};

// 한 달 동안의 수입 내역 조회
export const getMonthlyIncomeWithUserId = async (
  userId: number,
  yearMonth: string
) => {
  const date = new Date(`${yearMonth}-01T00:00:00Z`);
  const incomeList = await prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: startOfMonth(date),
        lte: endOfMonth(date),
      },
    },
  });

  return incomeList;
};

// 수입 내역 수정
export const updateIncome = async (formdate: FormData) => {
  const id = Number(formdate.get('id'));
  const incomeSource = formdate.get('value')?.toString();

  await prisma.income.update({
    where: { id },
    data: { incomeSource: incomeSource },
  });
};

// 해당 월의 작년 동월과의 수입액 차이 조회
export const getIncomeChangeFromLastMonth = async (
  userId: number,
  yearMonth: string
) => {
  const [year, month] = yearMonth.split('-').map(Number);
  const thisMonthStart = new Date(year, month - 1, 1);
  const thisMonthEnd = new Date(year, month, 0, 23, 59, 59, 999);

  const lastMonthStart = new Date(year, month - 2, 1);
  const lastMonthEnd = new Date(year, month - 1, 0, 23, 59, 59, 999);

  const [thisMonthData, lastMonthData] = await Promise.all([
    prisma.income.findMany({
      where: {
        userId,
        depositDate: { gte: thisMonthStart, lte: thisMonthEnd },
      },
    }),
    prisma.income.findMany({
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

//특정 기간의 급여 합 함수.
export const getIncomeSumByPeriod = async (
  userId: number,
  startDate: Date,
  endDate: Date
) => {
  const utcTimeStartDate = toUtcFromSeoul(startDate.toISOString());
  const utcTimeEndDate = toUtcFromSeoul(endDate.toISOString());
  const incomes = await prisma.income.findMany({
    where: {
      userId,
      depositDate: {
        gte: utcTimeStartDate,
        lte: utcTimeEndDate,
      },
    },
    select: { amount: true },
  });
  return incomes.reduce((sum, s) => sum + s.amount, 0);
};

// 작년 다음 달 수입 합 (지금이 6월이면 작년 7월)
export const getLastYearNextMonthIncomeSum = async (userId: number) => {
  const now = new Date();
  const year = now.getFullYear() - 1;
  const targetMonth = now.getMonth() + 1;
  const start = new Date(year, targetMonth, 1);
  const end = new Date(year, targetMonth + 1, 0, 23, 59, 59, 999);
  return getIncomeSumByPeriod(userId, start, end);
};

// 다음 달 예측 수입 조회
export async function getPredictedNextMonthIncome(
  userId: number
): Promise<number> {
  const now = new Date();
  const threeMonthAgoStart = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

  const [lastYearNextMonthSum, recent3MonthsSum, lastYear3MonthsSum] =
    await Promise.all([
      getLastYearNextMonthIncomeSum(userId),
      getIncomeSumByPeriod(userId, threeMonthAgoStart, end),
      getLastYearSamePeriodIncomeSum(userId),
    ]);

  const growthRate = recent3MonthsSum / lastYear3MonthsSum || 1;
  return lastYearNextMonthSum * growthRate;
}

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

// 수입별 수입원 출처 조회
export const getIncomeSourcesByUserId = async (
  userId: number,
  startDate: Date
) => {
  const now = new Date();
  const utcTime = toUtcFromSeoul(now.toISOString());

  return (
    await prisma.income.groupBy({
      by: ['incomeSource', 'depositorName'],
      where: {
        userId,
        depositDate: {
          gte: new Date(startDate),
          lte: utcTime,
        },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: 'desc' } },
    })
  ).map((item) => ({
    category: item.incomeSource ?? item.depositorName,
    amount: item._sum.amount ?? 0,
  }));
};
