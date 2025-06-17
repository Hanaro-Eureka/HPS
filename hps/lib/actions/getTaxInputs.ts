'use server';

import { calculateRefund } from '@/app/yearEndTax/utils/calculateRefund';
import { consumptionData } from '@/constants/consumptionData';
import prisma from '../db';

export async function getTaxInputs(userId: number) {
  // 사용자의 급여 누적 합산
  const salaries = await prisma.salary.findMany({
    where: { userId },
  });

  const salary = salaries.reduce((sum, s) => sum + s.amount, 0); // 실제 누적 소득

  // 소비 데이터가 없으면 0 반환
  if (!consumptionData.length) {
    return {
      salary,
      spending: 0,
      deduction: 0,
      refund: 0,
    };
  }

  // 실제 누적 소비
  const totalSpend = consumptionData.reduce(
    (sum, s) => sum + (s.trans_amt ?? 0),
    0
  );

  // 연말정산 예상 공제액 및 환급액 계산
  // 신용카드 60%, 체크/현금 40%, IRP 500만원 기준 가정
  const { limitedCardDeduction, refund } = calculateRefund({
    salary,
    spending: totalSpend,
    creditRate: 60,
    checkRate: 40,
    irpAmount: 5_000_000,
  });

  return {
    salary,
    spending: totalSpend,
    deduction: limitedCardDeduction,
    refund,
  };
}
