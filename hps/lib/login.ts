'use server';

import { loginValidator } from './validator';

type Input = {
  id: string;
  password: string;
};

export async function handleLogin(input: Input) {
  const result = await loginValidator.safeParseAsync(input);

  if (!result.success) {
    const firstError = result.error.errors[0];
    return {
      success: false,
      field: firstError.path[0] ?? 'form',
      message: firstError.message,
    };
  }
  return { success: true };
}
