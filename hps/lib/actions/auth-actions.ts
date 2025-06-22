import prisma from '../db';

export const getUser = async (userId: string) => {
  try {
    return prisma.user.findFirst({
      where: { loginId: userId },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    console.error('Error in getUser:', error);
  }

  return null;
};

export const getUserPassword = async (userId: string) =>
  prisma.user.findFirst({
    where: { loginId: userId },
    select: {
      password: true,
    },
  });
