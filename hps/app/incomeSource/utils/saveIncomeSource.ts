'use server';

import { incomeData } from '@/constants/incomeData';
import {
  getMonthlyIncomeWithUserId,
  createIncomeSources,
  removeIncomeSources,
} from '@/lib/actions/salary-select-actions';
import { auth } from '@/lib/auth';
import { parseKSTDateFromDtime } from './parseKSTDate';

export async function saveIncomeSource(ids: (string | number)[]) {
  const session = await auth();
  const userId = Number(session?.user?.id);

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const existing = await getMonthlyIncomeWithUserId(userId, thisMonth);

  const selectedItems = incomeData
    .filter((item) => ids.includes(item.id))
    .map((item) => ({
      amount: item.trans_amt,
      depositorName: item.trans_memo,
      depositDate: parseKSTDateFromDtime(item.trans_dtime),
    }));

  const selectedKeySet = new Set(
    selectedItems.map(
      (item) =>
        `${item.depositorName}-${item.amount}-${item.depositDate.toISOString().slice(0, 19)}`
    )
  );

  const existingKeyMap = new Map(
    existing.map((item) => [
      `${item.depositorName}-${item.amount}-${item.depositDate.toISOString().slice(0, 19)}`,
      item,
    ])
  );

  const toInsert = selectedItems.filter(
    (item) =>
      !existingKeyMap.has(
        `${item.depositorName}-${item.amount}-${item.depositDate.toISOString().slice(0, 19)}`
      )
  );

  const toDelete = Array.from(existingKeyMap.entries())
    .filter(([key]) => !selectedKeySet.has(key))
    .map(([, item]) => ({
      depositorName: item.depositorName!,
      amount: item.amount,
      depositDate: item.depositDate,
    }));

  if (toInsert.length > 0) {
    await createIncomeSources(userId, toInsert);
  }

  if (toDelete.length > 0) {
    await removeIncomeSources(userId, toDelete);
  }
}
