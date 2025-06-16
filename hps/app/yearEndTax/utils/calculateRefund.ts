type Params = {
  salary: number; // 연 총급여 (세전 기준)
  spending: number; // 카드 등 총 소비액
  creditRate: number; // 신용카드 사용 비중 (%)
  checkRate: number; // 체크카드·현금영수증 사용 비중 (%)
  irpAmount: number; // 연금저축+IRP 납입액
};

export function calculateRefund({
  salary,
  spending,
  creditRate,
  checkRate,
  irpAmount,
}: Params) {
  const base = salary * 0.25;
  const over = Math.max(spending - base, 0);

  const credit = over * (creditRate / 100) * 0.15;
  const check = over * (checkRate / 100) * 0.3;
  const totalCardDeduction = credit + check;

  const irpLimit = 9_000_000;
  const irpActual = Math.min(irpAmount, irpLimit);
  const irpDeductionRate = salary <= 55_000_000 ? 0.165 : 0.132;
  const irpDeduction = irpActual * irpDeductionRate;

  const taxRate = getTaxRate(salary);
  const cardRefund = totalCardDeduction * taxRate;
  const totalRefund = cardRefund + irpDeduction;

  return {
    salary,
    spending,
    totalCardDeduction: Math.round(totalCardDeduction),
    irpActual,
    irpDeduction: Math.round(irpDeduction),
    cardRefund: Math.round(cardRefund),
    refund: Math.round(totalRefund),
  };
}

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
