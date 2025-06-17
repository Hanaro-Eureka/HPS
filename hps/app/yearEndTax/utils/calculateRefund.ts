type Params = {
  salary: number;
  spending: number;
  creditRate: number;
  checkRate: number;
  irpAmount: number;
};

export function calculateRefund({
  salary,
  spending,
  creditRate,
  checkRate,
  irpAmount,
}: Params) {
  // 신용카드 소득공제 계산
  const base = salary * 0.25; // 총급여의 25% 초과분만 공제
  const over = Math.max(spending - base, 0);

  const credit = over * (creditRate / 100) * 0.15; // 신용카드: 15%
  const check = over * (checkRate / 100) * 0.3; // 체크카드: 30%
  const totalCardDeduction = credit + check;

  // 공제 한도 적용 (2025년 개정 반영)
  const cardDeductionLimit = salary <= 70_000_000 ? 3_000_000 : 2_500_000;
  const limitedCardDeduction = Math.min(totalCardDeduction, cardDeductionLimit);

  // IRP 세액공제
  const irpLimit = 9_000_000;
  const irpActual = Math.min(irpAmount, irpLimit);
  const irpDeductionRate = salary <= 55_000_000 ? 0.165 : 0.132;
  const irpDeduction = irpActual * irpDeductionRate;

  // 소득 구간별 예측 세율 적용
  function getTaxRate(income: number): number {
    if (income <= 14_000_000) return 0.06;
    if (income <= 50_000_000) return 0.15;
    if (income <= 88_000_000) return 0.24;
    if (income <= 150_000_000) return 0.35;
    if (income <= 300_000_000) return 0.38;
    if (income <= 500_000_000) return 0.4;
    if (income <= 1_000_000_000) return 0.42;
    return 0.45;
  }

  const taxRate = getTaxRate(salary);
  const cardRefund = limitedCardDeduction * taxRate;
  const totalRefund = cardRefund + irpDeduction;

  return {
    salary,
    spending,
    totalCardDeduction: Math.round(totalCardDeduction), // 계산된 총 카드공제액
    limitedCardDeduction: Math.round(limitedCardDeduction), // 실제 공제 반영액 (상한 적용 후)
    irpActual,
    irpDeduction: Math.round(irpDeduction),
    cardRefund: Math.round(cardRefund),
    refund: Math.round(totalRefund),
  };
}
