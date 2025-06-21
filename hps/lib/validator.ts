import { z } from 'zod';

export const loginValidator = z.object({
  id: z.string().min(1),
  password: z.string().min(6),
});

export const signUpValidator = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  id: z.string().min(1, '이름을 입력해주세요.'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
  birth: z.string().min(1, '생년월일을 입력해주세요.'),
});
