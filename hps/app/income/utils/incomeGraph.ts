export function calculateDiffRate(current: number, predicted: number): number {
  if (current <= 0) return 0;
  return (predicted - current) / current;
}

export function getIncomeColor(diffRate: number): {
  barColor: string;
  textColor: string;
} {
  if (diffRate > 0.05) {
    return {
      barColor: '#2F9E8C',
      textColor: '#2F9E8C',
    };
  }

  if (diffRate < -0.05) {
    return {
      barColor: '#E97272',
      textColor: '#E97272',
    };
  }

  return {
    barColor: '#FFDD3A',
    textColor: '#FFDD3A',
  };
}

export function getNextMonthLabel(baseDate: Date = new Date()): string {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const nextMonthDate = new Date(year, month + 1, 1);
  return `${nextMonthDate.getMonth() + 1}월`;
}
