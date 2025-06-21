import prisma from '../db';

export const getUser = async (userId: string) =>
  prisma.user.findFirst({
    where: { loginId: userId },
    select: {
      id: true,
      name: true,
    },
  });

export const getUserPassword = async (userId: string) =>
  prisma.user.findFirst({
    where: { loginId: userId },
    select: {
      password: true,
    },
  });
