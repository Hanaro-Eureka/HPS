export const formatDate = (dateStr: string): string =>
  `${+dateStr.slice(4, 6)}월 ${+dateStr.slice(6, 8)}일`;

export const formatTime = (dateStr: string): string =>
  `${dateStr.slice(8, 10)}:${dateStr.slice(10, 12)}`;

export const formatSpendTime = (dateStr: string): string =>
  `${dateStr.slice(9, 11)}:${dateStr.slice(11, 13)}`;

export const getCurrentMonth = (): number => new Date().getMonth() + 1;

export function getStartAndEndOfMonth(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59);
  return { start, end };
}

export const filterThisMonthData = <
  T extends Record<string, unknown>,
  K extends keyof T & string = 'trans_dtime',
>(
  data: T[],
  month: number,
  dateKey?: K
): T[] => {
  const key = (dateKey ?? 'trans_dtime') as keyof T;
  return data.filter((item) => {
    const dateValue = item[key];
    if (typeof dateValue === 'string') {
      return +dateValue.slice(4, 6) === month;
    }
    return false;
  });
};

// 날짜 기준 그룹화 함수
export const groupByDate = <
  T extends Record<string, unknown>,
  K extends keyof T & string = 'trans_dtime',
>(
  data: T[],
  dateKey?: K
): Record<string, T[]> => {
  const key = (dateKey ?? 'trans_dtime') as keyof T;

  return data.reduce((acc: Record<string, T[]>, cur: T) => {
    const dateValue = cur[key];
    if (typeof dateValue === 'string') {
      const groupKey = dateValue.slice(0, 8);
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(cur);
    }
    return acc;
  }, {});
};

export const groupByDateInSpendList = <T extends { trans_date: string }>(
  data: T[]
): Record<string, T[]> =>
  data.reduce((acc: Record<string, T[]>, cur: T) => {
    const key = cur.trans_date.slice(0, 8);
    if (!acc[key]) acc[key] = [];
    acc[key].push(cur);
    return acc;
  }, {});

export const calculateSpendingStatus = (
  income: number,
  spending: number
): {
  isOverSpent: boolean;
  used: number;
  remain: number;
} => {
  const isOverSpent = spending > income;
  const used = isOverSpent
    ? (income / spending) * 100
    : (spending / income) * 100;
  const remain = 100 - used;

  if (remain < 10) {
    // 너무 차이가 안 나면 그래프에서 안 보이니까
    return { isOverSpent, used: 95, remain: 5 };
  } else if (used < 5) {
    return { isOverSpent, used: 5, remain: 95 };
  }
  return { isOverSpent, used, remain };
};
