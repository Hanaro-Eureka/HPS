'use client';

import { getStartAndEndOfMonth } from '@/app/spendList/utils/spending';

type RateResult = {
  rate: number | null;
  colorClass: string;
  imagePath: string | null;
};

export function getConsumptionRateText(
  salaryList: { depositDate: Date; amount: number }[],
  spendingList: { trans_date: string; trans_amt: number }[]
): RateResult {
  const now = new Date();

  // 지난달 수입
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const { start: lastStart, end: lastEnd } =
    getStartAndEndOfMonth(lastMonthDate);
  const lastMonthSalary = salaryList
    .filter((s) => s.depositDate >= lastStart && s.depositDate <= lastEnd)
    .reduce((sum, s) => sum + s.amount, 0);

  // 이번 달 소비
  const thisMonth = now.getMonth() + 1;
  const thisMonthSpending = spendingList
    .filter((item) => +item.trans_date.slice(4, 6) === thisMonth)
    .reduce((sum, item) => sum + item.trans_amt, 0);

  if (lastMonthSalary === 0) {
    return { rate: null, colorClass: 'text-gray-time', imagePath: null };
  }

  const consumptionRate = Math.round(
    (thisMonthSpending / lastMonthSalary) * 100
  );

  let colorClass = '';
  let imagePath = '';
  if (consumptionRate > 60) {
    colorClass = 'text-consumption-red';
    imagePath = '/hanaMonWithRedCard.svg';
  } else if (consumptionRate >= 30) {
    colorClass = 'text-consumption-yellow';
    imagePath = '/hanaMonWithYellowCard.svg';
  } else {
    colorClass = 'text-consumption-green';
    imagePath = '/hanaMonWithGreenCard.svg';
  }

  return {
    rate: consumptionRate,
    colorClass,
    imagePath,
  };
}
