'use client';

import { consumptionData } from '@/constants/consumptionData';
import { useEffect, useState } from 'react';
import { getConsumptionRateText } from '../utils/evaluation';

type Salary = {
  depositDate: Date;
  amount: number;
};

type Props = {
  salaryList: Salary[];
};

export default function ConsumptionRateText({ salaryList }: Props) {
  const [rate, setRate] = useState<number | null>(null);
  const [colorClass, setColorClass] = useState('');

  useEffect(() => {
    const { rate, colorClass } = getConsumptionRateText(
      salaryList,
      consumptionData
    );
    setRate(rate);
    setColorClass(colorClass);
  }, [salaryList]);

  if (rate === null) {
    return (
      <p className='text-center text-sm font-medium text-gray-time mt-12'>
        지난달 수입 정보가 없습니다.
      </p>
    );
  }

  return (
    <p className='text-center text-sm font-medium text-black mt-2'>
      이번 달 지출이 지난달 수입 대비
      <span className={colorClass}>{rate}%</span> 수준이에요.
    </p>
  );
}
