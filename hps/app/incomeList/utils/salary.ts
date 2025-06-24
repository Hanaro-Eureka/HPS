import {
  getLastYearSixMonthSalariesWithUserId,
  getLatestSixMonthSalariesWithUserId,
} from '@/lib/actions/salary-actions';

const getLatestSixMonth = () => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;

  const arr: string[] = [];
  for (let i = 0; i < 6; i++) {
    if (thisMonth - i <= 0) {
      arr.push(
        `${thisYear - 1}-${(thisMonth - i + 12).toString().padStart(2, '0')}`
      );
    } else {
      // 2025-06 형식
      arr.push(`${thisYear}-${(thisMonth - i).toString().padStart(2, '0')}`);
    }
  }

  return arr;
};

export const getSixMonthIncome = async (userId: number) => {
  // 올해 6개월 수입
  const thisSixMonthIncome = await getLatestSixMonthSalariesWithUserId(userId);

  // 작년 6개월 수입
  const lastYearSixMonthIncome =
    await getLastYearSixMonthSalariesWithUserId(userId);

  // 집계할 6개월에 대한 List
  // ex) ['2025-06', '2025-05', '2025-04', '2025-03', '2025-02', '2025-01']
  const sixYearMonth = getLatestSixMonth();

  // DB에서 가지고 온 최근 6개월 치 소득이 있는 달(month) List : String
  // ex)['06', '05', '03', '01']
  const thisMonthes = thisSixMonthIncome.map(({ yearMonth }) =>
    yearMonth.slice(5, 7)
  );
  const lastMonthes = lastYearSixMonthIncome.map(({ yearMonth }) =>
    yearMonth.slice(5, 7)
  );

  // 올해 6개월동안 소득이 있던 달의 총 소득
  const thisTotalIncome = thisSixMonthIncome.map(
    ({ totalSalary }) => totalSalary
  );
  const lastTotalIncome = lastYearSixMonthIncome.map(
    ({ totalSalary }) => totalSalary
  );

  const arr: {
    month: string;
    thisIncome: number;
    lastIncome: number;
  }[] = [];

  for (let i = 5; i >= 0; i--) {
    arr.push({
      month: `${sixYearMonth[i].slice(5, 7)}월`,
      thisIncome: thisMonthes.includes(sixYearMonth[i].slice(5, 7))
        ? Number(
            thisTotalIncome[thisMonthes.indexOf(sixYearMonth[i].slice(5, 7))]
          )
        : 0,
      lastIncome: lastMonthes.includes(sixYearMonth[i].slice(5, 7))
        ? Number(
            lastTotalIncome[lastMonthes.indexOf(sixYearMonth[i].slice(5, 7))]
          )
        : 0,
    });

    sixYearMonth.pop();
  }

  return arr;
};

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

    if (typeof dateValue === 'object' && dateValue !== null) {
      const date = new Date(dateValue.toString());
      const groupKey = `${date.toISOString()}`;
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(cur);
    }
    return acc;
  }, {});
};
export const formatDate = (dateStr: string): string => {
  return `${+dateStr.slice(5, 7)}월 ${+dateStr.slice(8, 10)}일`;
};
export const formatTime = (dateStr: string): string =>
  `${dateStr.slice(11, 13)}:${dateStr.slice(14, 16)}`;

export const getThisYearMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  return `${year}-${month.toString().padStart(2, '0')}`;
};
