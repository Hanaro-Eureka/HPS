'use server';

import { getIncomeSumByPeriod } from './actions/income-actions';
import prisma from './db';

// 사용자의 아이디로 직장인 여부 확인
export const getFirstPensionDate = async (user_id: number) => {
  if (typeof user_id !== 'number' || Number.isNaN(user_id)) {
    throw new Error('유효하지 않은 사용자 ID');
  }
  return prisma.income.findFirst({
    where: {
      userId: user_id,
    },
    orderBy: {
      depositDate: 'asc', // 가장 오래된 날짜가 먼저 오도록 정렬
    },
    select: {
      depositDate: true,
    },
  });
};

//사용자의 아이디로 마지막 급여 금액 조회
export const getLastIncome = async (user_id: number) => {
  if (typeof user_id !== 'number' || Number.isNaN(user_id)) {
    throw new Error('유효하지 않은 사용자 ID');
  }
  const lastIncome = await prisma.income.findFirst({
    where: {
      userId: user_id,
    },
    orderBy: {
      depositDate: 'desc', // 가장 최근 날짜가 먼저 오도록 정렬
    },
    select: {
      amount: true,
    },
  });

  return lastIncome ? lastIncome.amount : 0; // 마지막 급여가 없으면 0 반환
};

// 작년 동일 월 수입 합 (지금이 6월이면 2024년 6월)
export const getLastYearSameMonthIncomeSum = async (userId: number) => {
  const now = new Date();
  const year = now.getFullYear() - 1;
  const month = now.getMonth(); // 0-indexed
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
  return getIncomeSumByPeriod(userId, start, end);
};
// 작년 동일 분기 수입 합 (지금이 6월이면 3~5월)
export const getLastYearSamePeriodIncomeSum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear() - 1, now.getMonth() - 3, 1);
  const end = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  );
  return getIncomeSumByPeriod(userId, start, end);
};
