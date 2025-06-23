'use server';

import bcrypt from 'bcryptjs';
import prisma from '../db';
import { Prisma } from '../generated/prisma';

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
  const value = formData.get('value')?.toString() ?? '';

  if (!id || Number.isNaN(id)) throw new Error('유효하지 않은 사용자 ID');

  if (field === 'loginId') {
    if (value.trim().length < 1) {
      throw new Error('로그인 아이디는 1자 이상이어야 합니다.');
    }
  }

  if (field === 'birthDate') {
    const parsed = value.replace(/-/g, '');
    if (!/^\d{8}$/.test(parsed)) {
      throw new Error('생년월일은 YYYYMMDD 형식으로 입력되어야 합니다.');
    }
  }

  const parsedValue = field === 'birthDate' ? value.replace(/-/g, '') : value;

  try {
    await prisma.user.update({
      where: { id },
      data: { [field]: parsedValue },
    });
  } catch (err: unknown) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002' &&
      (err.meta?.target as string[])?.includes('loginId')
    ) {
      throw new Error('중복된 ID입니다.');
    }

    throw err;
  }
};

export async function changePassword(formData: FormData) {
  const userId = Number(formData.get('userId'));
  const currentPassword = formData.get('currentPassword')?.toString() || '';
  const newPassword = formData.get('newPassword')?.toString() || '';

  if (!userId || !currentPassword || !newPassword) {
    throw new Error('입력값이 부족합니다.');
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  if (!user?.password)
    throw new Error('사용자를 찾을 수 없거나 비밀번호가 없습니다.');

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) throw new Error('기존 비밀번호가 일치하지 않습니다.');

  const hashed = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed },
  });
}
