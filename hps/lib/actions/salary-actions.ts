import prisma from '../db';

export const getSalaryWithUserId = async (userId: number) =>
  prisma.salary.findFirst({
    where: { userId }, // 원하는 userId로 바꿔주세요
    orderBy: {
      depositDate: 'desc',
    },
  });
