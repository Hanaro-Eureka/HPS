'use server';

import { incomeData } from '@/constants/incomeData';
import { redirect } from 'next/navigation';
import {
  getSalaryThisYear,
  createIncomeSources,
} from '@/lib/actions/salary-select-actions';
import { parseKSTDateFromDtime } from './parseKSTDate';

export async function saveIncomeSource(ids: (string | number)[]) {
  const userId = 1; // TODO: 로그인 미구현 상태, 임시 고정

  const existing = await getSalaryThisYear(userId);

  const selectedItems = incomeData
    .filter((item) => ids.includes(item.id))
    .map((item) => ({
      amount: item.trans_amt,
      depositorName: item.trans_memo,
      depositDate: parseKSTDateFromDtime(item.trans_dtime),
    }));

  const existingSet = new Set(
    existing.map(
      (item) =>
        `${item.depositorName}-${item.amount}-${item.depositDate.toISOString().slice(0, 19)}`
    )
  );

  const toInsert = selectedItems.filter(
    (item) =>
      !existingSet.has(
        `${item.depositorName}-${item.amount}-${item.depositDate.toISOString().slice(0, 19)}`
      )
  );

  if (toInsert.length === 0) return redirect('/incomeList');

  await createIncomeSources(userId, toInsert);
  redirect('/incomeList');
}
