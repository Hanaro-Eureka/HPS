import { z } from 'zod';

export const loginValidator = z.object({
  id: z.string().min(1),
  password: z.string().min(6),
});
