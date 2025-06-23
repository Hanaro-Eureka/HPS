type Expense = {
  trans_date: string;
  trans_amt: number;
  merchant_name: string;
};

// 특정 가맹점 소비가 고정비인지 판단(3개월 이상, ±5천원/±2일 이내 반복)
export function isRecurringExpense(expenseHistory: Expense[]): boolean {
  const groupedByMonth = groupBy(expenseHistory, (e) =>
    e.trans_date.slice(0, 6)
  );

  const monthSummaries = Object.values(groupedByMonth).map((monthGroup) => {
    const avgAmt = average(monthGroup.map((e) => e.trans_amt));
    const avgDay = average(monthGroup.map((e) => +e.trans_date.slice(6, 8)));
    return { avgAmt, avgDay };
  });

  // 기준 오차 이내인 월 개수
  const similarCount = monthSummaries.filter(({ avgAmt, avgDay }, _, arr) =>
    arr.every(
      (other) =>
        Math.abs(avgAmt - other.avgAmt) <= 5000 &&
        Math.abs(avgDay - other.avgDay) <= 2
    )
  ).length;

  return similarCount >= 3;
}

export function tagRecurringExpenses(
  data: Expense[]
): (Expense & { isFixed: boolean })[] {
  const groupedByMerchant = groupBy(data, (e) => e.merchant_name);

  return data.map((expense) => {
    const merchantExpenses = groupedByMerchant[expense.merchant_name];
    const isFixed = isRecurringExpense(merchantExpenses);
    return { ...expense, isFixed };
  });
}

function average(nums: number[]): number {
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

function groupBy<T>(
  array: T[],
  getKey: (item: T) => string
): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}
