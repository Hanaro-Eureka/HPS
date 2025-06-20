'use server';

import { consumptionData } from '@/constants/consumptionData';
import { redirect } from 'next/navigation';
import { createUselessSpendingMany } from '@/lib/actions/useless-spending-actions';

export async function saveUselessSpending(ids: (string | number)[]) {
  const userId = 1; // TODO: 로그인 미구현 상태, 임시 고정

  const selectedItems = consumptionData
    .filter((item) => ids.includes(item.id))
    .map((item) => ({
      category: item.trans_category,
      amount: item.trans_amt,
    }));

  if (selectedItems.length === 0) {
    throw new Error('선택된 항목이 없습니다.');
  }

  await createUselessSpendingMany(userId, selectedItems);

  // 선택한 항목 DB에 저장 완료 후 하나만 챌린지 페이지로 이동
  redirect('/hanaChallenge');
}
