export const formatDate = (dateStr: string): string =>
  `${+dateStr.slice(4, 6)}월 ${+dateStr.slice(6, 8)}일`;

export const formatTime = (dateStr: string): string =>
  `${dateStr.slice(9, 11)}:${dateStr.slice(11, 13)}`;

export const getCurrentMonth = (): number => new Date().getMonth() + 1;

export const filterThisMonthData = <T extends { trans_date: string }>(
  data: T[],
  month: number
): T[] => data.filter((item) => +item.trans_date.slice(4, 6) === month);

export const groupByDate = <T extends { trans_date: string }>(
  data: T[]
): Record<string, T[]> =>
  data.reduce((acc: Record<string, T[]>, cur: T) => {
    const key = cur.trans_date.slice(0, 8);
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
  return { isOverSpent, used, remain };
};
