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
      businessCode: true,
    },
  });

  if (
    !user ||
    !user.name ||
    !user.loginId ||
    !user.birthDate ||
    user.id === undefined
  ) {
    throw new Error('사용자 정보가 충분하지 않습니다.');
  }

  return {
    user: {
      id: user.id,
      name: user.name,
      loginId: user.loginId,
      birthDate: user.birthDate,
      businessCode: user.businessCode ?? null, // null 허용
    },
  };
};

export const updateUserField = async (formData: FormData) => {
  const id = Number(formData.get('id'));
  const field = formData.get('field') as
    | 'loginId'
    | 'birthDate'
    | 'businessCode';
  const value = formData.get('value')?.toString() ?? '';

  if (!id || Number.isNaN(id)) {
    return { success: false, message: '유효하지 않은 사용자 ID입니다.' };
  }

  if (field === 'loginId') {
    if (value.trim().length < 1) {
      return {
        success: false,
        message: '로그인 아이디는 1자 이상이어야 합니다.',
      };
    }
  }

  if (field === 'birthDate') {
    const parsed = value.replace(/-/g, '');
    if (!/^\d{8}$/.test(parsed)) {
      return {
        success: false,
        message: '생년월일은 YYYYMMDD 형식으로 입력되어야 합니다.',
      };
    }
  }

  const parsedValue = field === 'birthDate' ? value.replace(/-/g, '') : value;

  try {
    await prisma.user.update({
      where: { id },
      data: { [field]: parsedValue },
    });

    return { success: true };
  } catch (err: unknown) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === 'P2002' &&
      (err.meta?.target as string[])?.includes('loginId')
    ) {
      return { success: false, message: '중복된 ID입니다.' };
    }

    return {
      success: false,
      message: '업데이트 중 알 수 없는 오류가 발생했습니다.',
    };
  }
};

export async function changePassword(formData: FormData) {
  const userId = Number(formData.get('userId'));
  const currentPassword = formData.get('currentPassword')?.toString() || '';
  const newPassword = formData.get('newPassword')?.toString() || '';

  if (!userId || !currentPassword || !newPassword) {
    return { success: false, message: '입력값이 부족합니다.' };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user?.password) {
      return {
        success: false,
        message: '사용자를 찾을 수 없거나 비밀번호가 없습니다.',
      };
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return { success: false, message: '기존 비밀번호가 일치하지 않습니다.' };
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { success: true };
  } catch (err) {
    return { success: false, message: '비밀번호 변경 중 오류가 발생했습니다.' };
  }
}
