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
  // [288000, 300000]
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
