import prisma from '../db';

export const getSalariesWithUserId = async (userId: number, startDate: Date) =>
  prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: new Date(startDate),
        lte: new Date(),
      },
    },
  });

export const getThisYearSalary = async (
  userId: number,
  startOfYear: Date,
  endOfYear: Date
) =>
  prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: startOfYear,
        lte: endOfYear,
      },
    },
  });

export const getMonthlySalary = async (
  userId: number,
  startOfMonth: Date,
  endOfMonth: Date
) =>
  prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

// 지난 달 입금 합 구하자. (지금이 6월 n일이라면 5월 입금 합.)
export const getLastMonthSalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1); // 지난 달 1일
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999); // 지난 달 말일

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};

// 직전 1개월,2개월,3개월 수입 합! (지금이 6월 n일이라면 3,4,5월 입금 합)
export const getRecent3MonthsSalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 3, 1); // 3개월 전 1일 (3월 1일)
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999); // 지난 달 말일 (5월 31일)

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};

// 동일 13개월 전, 14개월 전, 15개월 전 수입의 합
// (지금이 2025년 6월이라면 2024년 3,4,5월 입금 합)
export const getLastYearSamePeriodSalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear() - 1, now.getMonth() - 3, 1); // 작년 3월 1일
  const end = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    0,
    23,
    59,
    59,
    999
  ); // 작년 5월 31일

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};

// 11개월 전 달 월급. (지금이 2025년 6월이라면 2024년 7월 입금 합.)
export const getLastYearNextMonthSalarySum = async (userId: number) => {
  const now = new Date();
  const year = now.getFullYear() - 1;
  const targetMonth = now.getMonth() + 1; // 다음 달 (0-indexed)

  const start = new Date(year, targetMonth, 1); // ex: 2024-07-01
  const end = new Date(year, targetMonth + 1, 0, 23, 59, 59, 999); // 2024-07-31

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};
// 직전 1개월,2개월,3개월 수입 합! (지금이 6월 n일이라면 3,4,5월 입금 합)
export const getRecent6MonthsSalarySum = async (userId: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 6, 1); // 3개월 전 1일 (3월 1일)
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999); // 지난 달 말일 (5월 31일)

  const salaries = await prisma.salary.findMany({
    where: {
      userId,
      depositDate: {
        gte: start,
        lte: end,
      },
    },
    select: { amount: true },
  });

  return salaries.reduce((sum, s) => sum + s.amount, 0);
};
