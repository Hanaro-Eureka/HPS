import prisma from '../db';

type FixedExpenseInput = {
  userId: number;
  expenseName: string;
  lastAmount: number;
  lastIncomeDate: Date;
};

export async function upsertFixedExpense(input: FixedExpenseInput) {
  const { userId, expenseName, lastAmount, lastIncomeDate } = input;

  return await prisma.fixedExpense.upsert({
    where: {
      id:
        (
          await prisma.fixedExpense.findFirst({
            where: { userId, expenseName },
          })
        )?.id ?? 0, // 존재하지 않으면 무조건 create
    },
    update: {
      lastAmount,
      lastIncomeDate,
    },
    create: {
      userId,
      expenseName,
      lastAmount,
      lastIncomeDate,
    },
  });
}
