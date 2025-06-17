'use server';

import prisma from '../db';

// 사용자의 아이디로 직장인 여부 확인
export const getUserIsSalaryMan = async (id: number) => {
  if (typeof id !== 'number' || Number.isNaN(id)) {
    throw new Error('유효하지 않은 사용자 ID');
  }
  return prisma.user.findFirst({
    where: {
      id,
    },
    select: {
      isSalaryMan: true,
    },
  });
};
