import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { getUser, getUserPassword } from './actions/auth-actions';

export const loginValidator = z
  .object({
    id: z.string().min(1, '아이디를 입력해주세요.'),
    password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
  })
  .superRefine(async ({ id }, ctx) => {
    const user = await getUser(id);
    if (!user) {
      ctx.addIssue({
        code: 'custom',
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
        path: ['idpass'],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ id, password }, ctx) => {
    const userPass = await getUserPassword(id);
    const isValid =
      userPass && (await bcrypt.compare(password, userPass.password));
    if (!isValid) {
      ctx.addIssue({
        code: 'custom',
        message: '아이디 또는 비밀번호가 일치하지 않습니다.',
        path: ['idpass'],
        fatal: true,
      });
      return z.NEVER;
    }
  });

export const signUpValidator = z
  .object({
    name: z.string().min(1, '이름을 입력해주세요.'),
    id: z.string().min(1, '아이디를 입력해주세요.'),
    password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
    birth: z.string().min(1, '생년월일을 입력해주세요.'),
    businessCode: z.string().min(1, '업종을 선택해주세요'),
  })
  .superRefine(async ({ id }, ctx) => {
    const user = await getUser(id);
    if (user) {
      ctx.addIssue({
        code: 'custom',
        message: '이미 등록된 아이디입니다.',
        path: ['id'],
        fatal: true,
      });

      return z.NEVER;
    }
  })
  .superRefine(({ birth }, ctx) => {
    const today = new Date();
    const birthDate = new Date(birth);
    if (birthDate > today) {
      ctx.addIssue({
        code: 'custom',
        message: '생년월일은 오늘 이전이어야 합니다.',
        path: ['birth'],
        fatal: true,
      });
      return z.NEVER;
    }
  });
