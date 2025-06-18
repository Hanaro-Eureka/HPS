'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/db';

const validFields = [
  'cashRcpIssue',
  'voucherUsed',
  'upCheckRatilo',
  'upCultureSpend',
] as const;

type ValidCheckBoxField = (typeof validFields)[number];

export const updateCheckBoxField = async (field: ValidCheckBoxField) => {
  const userId = 1;

  const current = await prisma.checkBox.findFirst({
    where: { userId },
    select: { [field]: true }, // Date | null 상태임.
  });

  const currentValue = current?.[field];

  await prisma.checkBox.updateMany({
    where: { userId },
    data: {
      [field]: currentValue ? null : new Date(),
    },
  });

  revalidatePath('/yearEndTax');
};

export const getCheckBoxByUserId = async (userId: number) => {
  return prisma.checkBox.findFirst({
    where: { userId },
  });
};
