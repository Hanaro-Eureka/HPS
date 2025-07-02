'use server';

import { hash } from 'bcryptjs';
import prisma from '@/lib/db';
import { signUpValidator } from './validator';

type Input = {
  name: string;
  id: string;
  password: string;
  birth: string;
  businessCode: string;
};

export async function handleSignUp(input: Input) {
  const result = await signUpValidator.safeParseAsync(input);

  if (!result.success) {
    const firstError = result.error.errors[0];
    return {
      success: false,
      field: firstError.path[0] ?? 'form',
      message: firstError.message,
    };
  }

  const { name, id, birth, password, businessCode } = result.data;
  const birthInt = birth.replace(/-/g, ''); // YYYYMMDD 형식으로 변환

  const hashed = await hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      loginId: id,
      birthDate: birthInt,
      password: hashed,
      businessCode,
    },
  });

  return { success: true };
}
