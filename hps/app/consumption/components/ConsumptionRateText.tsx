'use client';

import { consumptionData } from '@/constants/consumptionData';
import { useEffect, useState } from 'react';
import { getConsumptionRateText } from '../utils/evaluation';

type Income = {
  depositDate: Date;
  amount: number;
};

type Props = {
  incomeList: Income[];
};

export default function ConsumptionRateText({ incomeList }: Props) {
  const [rate, setRate] = useState<number | null>(null);
  const [colorClass, setColorClass] = useState('');

  useEffect(() => {
    const predictedIncome = incomeList.reduce((sum, s) => sum + s.amount, 0);

    const { rate, colorClass } = getConsumptionRateText(
      predictedIncome,
      consumptionData
    );
    setRate(rate);
    setColorClass(colorClass);
  }, [incomeList]);

  if (rate === null) {
    return (
      <p className='text-center text-sm font-medium text-gray-time mt-12'>
        지난달 수입 정보가 없습니다.
      </p>
    );
  }

  return (
    <p className='text-center text-sm font-medium text-black-font mt-2'>
      이번 달 지출이 지난 달 수입 대비&nbsp;
      <span className={colorClass}>{rate}%</span> 수준이에요.
    </p>
  );
}
