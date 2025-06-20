export const formatDate = (dateStr: string): string =>
  `${+dateStr.slice(4, 6)}월 ${+dateStr.slice(6, 8)}일`;

export const formatTime = (dateStr: string): string =>
  `${dateStr.slice(8, 10)}:${dateStr.slice(10, 12)}`;

export const getCurrentMonth = (): number => new Date().getMonth() + 1;

export const filterThisMonthData = <T extends Record<string, any>>(
  data: T[],
  month: number,
  dateKey: keyof T
): T[] => data.filter((item) => +item[dateKey]?.slice(4, 6) === month);

export const groupByDate = <T extends Record<string, any>>(
  data: T[],
  dateKey: keyof T
): Record<string, T[]> =>
  data.reduce((acc: Record<string, T[]>, cur: T) => {
    const key = cur[dateKey]?.slice(0, 8);
    if (!acc[key]) acc[key] = [];
    acc[key].push(cur);
    return acc;
  }, {});

export const calculateSpendingStatus = (
  salary: number,
  spending: number
): {
  isOverSpent: boolean;
  used: number;
  remain: number;
} => {
  const isOverSpent = spending > salary;
  const used = isOverSpent
    ? (salary / spending) * 100
    : (spending / salary) * 100;
  const remain = 100 - used;

  if (remain < 10) {
    // 너무 차이가 안 나면 그래프에서 안 보이니까
    return { isOverSpent, used: 95, remain: 5 };
  }
  return { isOverSpent, used, remain };
};
