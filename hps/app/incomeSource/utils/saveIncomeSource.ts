'use server';

import { incomeData } from '@/constants/incomeData';
import { redirect } from 'next/navigation';
import { createIncomeSources } from '@/lib/actions/salary-select-actions';

export async function saveIncomeSource(ids: (string | number)[]) {
  const userId = 1; // TODO: 로그인 미구현 상태, 임시 고정

  const selectedItems = incomeData
    .filter((item) => ids.includes(item.id))
    .map((item) => ({
      amount: item.trans_amt,
      depositorName: item.trans_memo,
      depositDate: new Date(
        `${item.trans_dtime.slice(0, 4)}-${item.trans_dtime.slice(4, 6)}-${item.trans_dtime.slice(6, 8)}T${item.trans_dtime.slice(8, 10)}:${item.trans_dtime.slice(10, 12)}:${item.trans_dtime.slice(12, 14)}`
      ),
    }));

  if (selectedItems.length === 0) {
    throw new Error('선택된 항목이 없습니다.');
  }

  await createIncomeSources(userId, selectedItems);

  redirect('/incomeList');
}
