'use server';

import prisma from '../db';

export const getUserInfo = async (id: number) => {
  const user = await prisma.user.findFirst({
    where: { id: id },
    select: {
      name: true,
      loginId: true,
      birthDate: true,
      id: true,
    },
  });
  if (!user) throw new Error('사용자 정보를 찾을 수 없음.');

  return { user };
};

export const updateUserField = async (formData: FormData) => {
  const id = Number(formData.get('id'));
  const field = formData.get('field') as 'loginId' | 'birthDate';
  const value = formData.get('value')?.toString() ?? null;

  if (!id || Number.isNaN(id)) throw new Error('유효하지 않은 사용자 ID');

  const parsedValue = value === '' ? null : value;

  await prisma.user.update({
    where: { id },
    data: { [field]: parsedValue },
  });
};
