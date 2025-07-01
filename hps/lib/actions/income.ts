'use server';

import prisma from '../db';

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
