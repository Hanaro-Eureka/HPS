'use server';

import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';
import prisma from '../db';
import { signUpValidator } from '../validator';
import { getUser } from './auth-actions';

export async function SignUp(formData: FormData) {
  const raw = {
    name: formData.get('name')?.toString(),
    id: formData.get('id')?.toString(),
    password: formData.get('password')?.toString(),
    birth: formData.get('birth')?.toString(),
  };

  const result = signUpValidator.safeParse(raw);
  if (!result.success) {
    throw new Error(result.error.errors[0].message);
  }

  const { name, id, password, birth } = result.data;

  const birthInt = birth.replace(/-/g, ''); // YYYYMMDD 형식으로 변환
  const exists = !getUser(id);

  if (exists) {
    throw new Error('이미 등록된 아이디입니다.');
  }

  const hashed = await hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      loginId: id,
      password: hashed,
      birthDate: birthInt,
    },
  });

  redirect('/login');
}
